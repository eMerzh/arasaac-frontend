import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth'
import { DEFAULT_LIST } from 'utils'
import PictogramSnippet from 'components/PictogramSnippet/DragPictogramSnippet'
import CustomDragLayer from 'components/PictogramSnippet/CustomDragLayer'
import ListSnippet from './ListSnippet'

const Masonry = require('react-masonry-component')
const masonryOptions = {
  transitionDuration: '1s'
}

const styles = {
  masonry: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 2,
    justifyContent: 'space-around'
  }
}

export class FavoriteList extends React.Component {
  // componentDidMount() {
  //   document.body.addEventListener('mousemove', (e) => this.showCords(e))
  // }

  // showCords = (event) => {
  //   const x = event.clientX
  //   const y = event.clientY
  //   const coor = 'X coords: ' + x + ', Y coords: ' + y
  //   console.log(coor)
  // };

  handleDeleteFavorite = (fileName) => {
    const { onDeleteFavorite, selectedList } = this.props
    onDeleteFavorite(fileName, selectedList)
  };

  render() {
    const {
      items,
      width,
      selectedList,
      onDownload,
      onDelete,
      onSelect,
      onRename,
      onDrop,
      listPictograms
    } = this.props
    const [...lists] = items.keys()
    let renderLists
    if (selectedList === DEFAULT_LIST) {
      renderLists = lists
        .filter((listItem) => listItem !== DEFAULT_LIST)
        .map((listItem) => {
          const totalItems = items.get(listItem).size
          return (
            <ListSnippet
              key={listItem}
              listName={listItem}
              totalItems={totalItems}
              onDelete={onDelete}
              onDownload={onDownload}
              onSelect={onSelect}
              onRename={onRename}
            />
          )
        })
    } else {
      /* in these case we just render back button */
      renderLists = (
        <ListSnippet
          key={DEFAULT_LIST}
          listName={DEFAULT_LIST}
          onDelete={onDelete}
          onDownload={onDownload}
          onSelect={onSelect}
          onRename={onRename}
        />
      )
    }

    const renderPictograms = listPictograms.map((pictogram) => {
      console.log(pictogram._id, '*****')
      return (
        <PictogramSnippet
          pictogram={pictogram}
          locale={'es'}
          key={pictogram._id}
          showExtra={width === LARGE}
          onDrop={onDrop}
          onDelete={this.handleDeleteFavorite}
        />
      )
    })

    return (
      <div>
        {width !== SMALL ? (
          <Masonry
            className={'my-gallery-class'} // default ''
            elementType={'ul'} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            style={styles.masonry}
          >
            {renderLists}
            {renderPictograms}
          </Masonry>
        ) : (
          <ul>
            {renderLists}
            {renderPictograms}
          </ul>
        )}
        <CustomDragLayer />
      </div>
    )
  }
}

FavoriteList.propTypes = {
  items: PropTypes.object,
  width: PropTypes.number.isRequired,
  listPictograms: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  selectedList: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDeleteFavorite: PropTypes.func.isRequired
}

export default withWidth()(DragDropContext(HTML5Backend)(FavoriteList))

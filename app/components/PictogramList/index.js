import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PictogramSnippet from 'components/PictogramSnippet'
import { Map } from 'immutable'
import Pagination from 'material-ui-pagination'

const itemsPerPage = 10 /* number of items per page */
const display = 10 /* number of pages to see in the paginator */

export class PictogramList extends PureComponent {

  state = {
    currentPage: 1
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pictograms !== this.props.pictograms) {
      // reset pagination, as data has changed:
      this.setState({ currentPage: 1 })
    }
  }

  setTopRef = (element) => {
    this.topPosition = element
  }

  handlePageClick = (currentPage) => {
    this.setState({ currentPage })
    this.topPosition.scrollIntoView()
    // window.scroll(0, 0)
  }

  render() {
    const { locale, pictograms, filtersMap, setFilterItems } = this.props
    const { currentPage } = this.state
    const total = Math.ceil(pictograms.length / itemsPerPage)
    const offset = Math.ceil((currentPage - 1) * itemsPerPage)
    const visiblePictograms = this.props.pictograms.slice(offset, offset + itemsPerPage)
    const pagination = (pictograms.length >= itemsPerPage) ?
      (<Pagination
        total={total}
        current={currentPage}
        display={display}
        onChange={this.handlePageClick}
      />)
      : null
    return (
      <div ref={this.setTopRef}>
        {pagination}
        <ul>
          { visiblePictograms.map((pictogram) =>
            <PictogramSnippet
              key={pictogram.idPictogram}
              pictogram={pictogram}
              locale={locale}
              filtersMap={filtersMap}
              setFilterItems={setFilterItems}
              showLabels={this.props.showLabels}
            />
          )}
        </ul>
        {pagination}
      </div>
    )
  }
}

PictogramList.propTypes = {
  pictograms: PropTypes.arrayOf(PropTypes.object),
  // with optional parameters in the router is slower in my tests ????
  // rollback from https://github.com/react-boilerplate/react-boilerplate/issues/1748
  locale: PropTypes.string,
  showLabels: PropTypes.bool.isRequired,
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired
}

export default PictogramList

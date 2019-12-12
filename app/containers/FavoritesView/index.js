/*
 *
 * PictogramsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FavoriteList from 'components/FavoriteList'
import { withRouter } from 'react-router'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import {
  deleteFavorite,
  addList,
  renameList,
  deleteList
} from 'containers/App/actions'
import {
  makeSelectHasUser,
  makeSelectFavorites
} from 'containers/App/selectors'
import {
  makeLoadingSelector,
  makeListSelector,
  makeFavoritePictogramsSelector
} from 'containers/PictogramsView/selectors'
import {
  favoritePictograms,
  toggleShowFilter,
  favoriteListSelect
} from 'containers/PictogramsView/actions'
import messages from './messages'

class FavoritesView extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    listName: ''
  };

  componentDidMount() {
    const { requestFavorites, locale, token, favorites } = this.props

    //  TODO: just ask once this stuff, once the app is open, depending on locale!!!
    if (favorites && token) {
      const [...lists] = favorites.keys()
      const favoriteIds = lists.map((list) => favorites.get(list).toJS()).flat()
      requestFavorites(locale, favoriteIds, token)
    }
  }

  handleAddFavorite = (fileName, listName) => {
    const { addFavorite, token } = this.props
    addFavorite(fileName, listName, token)
  };

  handledeletesFavorite = (fileName, listName) => {
    this.props.deleteFavorite(fileName, listName)
  };

  handleFavoriteListSelect = (listName) => {
    this.props.favoriteListSelect(listName)
  };

  handleDeleteList = (listName) => {
    const { deleteList, token } = this.props
    deleteList(listName, token)
  };

  handleListNameChange = (e) => {
    this.setState({
      listName: e.target.value
    })
  };

  handleAddList = () => {
    const { addList, token } = this.props
    addList(this.state.listName, token)
    this.setState({ listName: '' })
  };

  handleRenameList = (listName, newListName) => {
    console.log(`Rename list ${listName} to ${newListName}`)
    const { renameList, token } = this.props
    renameList(listName, newListName, token)
  };

  handleDownloadList = (listName) => {
    console.log(`Download list ${listName}`)
  };

  render() {
    const { favorites, selectedList, favoritePictograms, intl } = this.props

    const { formatMessage } = intl

    return (
      <View left={true} right={true}>
        <Helmet
          title='Favorites View'
          meta={[{ name: 'description', content: 'Pictogram favorites' }]}
        />
        <Divider />

        <TextField
          hintText={formatMessage(messages.addListHint)}
          floatingLabelText={formatMessage(messages.listName)}
          style={{ marginRight: 10 }}
          value={this.state.listName}
          onChange={this.handleListNameChange}
        />
        <RaisedButton
          label={<FormattedMessage {...messages.addList} />}
          primary={true}
          onClick={this.handleAddList}
          disabled={!this.state.listName}
        />
        <FavoriteList
          items={favorites}
          onSelect={this.handleFavoriteListSelect}
          selectedList={selectedList}
          onDelete={this.handleDeleteList}
          onDownload={this.handleDownloadList}
          onRename={this.handleRenameList}
          onAdd={this.handleAddList}
          listPictograms={favoritePictograms}
        />
      </View>
    )
  }
}

FavoritesView.propTypes = {
  // Injected by React Router
  locale: PropTypes.string.isRequired,
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  renameList: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  favorites: PropTypes.object.isRequired,
  requestFavorites: PropTypes.func.isRequired,
  selectedList: PropTypes.string.isRequired,
  favoriteListSelect: PropTypes.func.isRequired,
  favoritePictograms: PropTypes.arrayOf(PropTypes.object),
  intl: intlShape.isRequired
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  token: makeSelectHasUser()(state),
  favorites: makeSelectFavorites()(state),
  selectedList: makeListSelector()(state),
  favoritePictograms: makeFavoritePictogramsSelector()(state)
})

const mapDispatchToProps = (dispatch) => ({
  requestFavorites: (locale, idFavorites, token) => {
    dispatch(favoritePictograms.request(locale, idFavorites, token))
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  },

  deleteFavorite: (fileName, listName, token) => {
    dispatch(deleteFavorite.request(fileName, listName, token))
  },
  addList: (listName, token) => {
    dispatch(addList.request(listName, token))
  },
  deleteList: (listName, token) => {
    dispatch(deleteList.request(listName, token))
  },
  renameList: (listName, newListName, token) => {
    dispatch(renameList.request(listName, newListName, token))
  },
  favoriteListSelect: (listName) => {
    dispatch(favoriteListSelect(listName))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(muiThemeable()(injectIntl(FavoritesView))))

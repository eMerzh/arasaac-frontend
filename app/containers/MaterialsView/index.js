/*
 *
 * MaterialsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import SearchField from 'components/SearchField'
import Toggle from 'material-ui/Toggle'
import {Tabs, Tab} from 'material-ui/Tabs'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import SearchIcon from 'material-ui/svg-icons/action/search'
import NewReleasesIcon from 'material-ui/svg-icons/av/new-releases'
import SwipeableViews from 'react-swipeable-views'
import { Map } from 'immutable'
import FilterList from 'components/Filters'
import MaterialList from 'components/MaterialList'
import { withRouter } from 'react-router'
import {
  filtersSelector,
  showFiltersSelector,
  localeSelector,
  loadingSelector,
  searchResultsSelector,
  visibleMaterialsSelector
  } from './selectors'
import { materials, toggleShowFilter, setFilterItems } from './actions'
import Slide from './Slide'
import messages from './messages'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: '2rem'
  }
}

class MaterialsView extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    })
  }

  componentDidMount() {
    if (this.props.params.searchText && !this.props.searchResults) {
      this.props.requestMaterials(this.props.locale, this.props.params.searchText)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.searchText !== nextProps.params.searchText) {
      this.props.requestMaterials(this.props.locale, nextProps.params.searchText)
    }
  }

  handleSubmit = (nextValue) => {
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/materials/search/${nextValue}`)
    }
  }

  render() {
    const { showFilter, filters, visibleMaterials, locale, loading, filtersData } = this.props
    const searchText = this.props.params.searchText || ''
    let gallery
    if (loading) {
      gallery = <p> Searching materials...</p>
    } else if (!searchText) {
      gallery = null
    } else {
      gallery = visibleMaterials.length > 0
      ? (
        <MaterialList
          materials={visibleMaterials}
          locale={locale}
          filtersMap={filters}
          setFilterItems={this.props.setFilterItems}
          filtersData={filtersData}
        />
      )
      : <p>{<FormattedMessage {...messages.materialsNotFound} />}</p>
    }
    return (
      <View left={false}>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex} >
          <Tab label='Buscar' icon={<SearchIcon />} value={0} />
          <Tab label='Novedades' icon={<NewReleasesIcon />} value={1} />
          <Tab label='Favoritos' icon={<FavoriteIcon />} value={2} />
        </Tabs>
        <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange} >
          <div>
          <Slide>
            <Helmet title='PictogramsView' meta={[{ name: 'description', content: 'Description of PictogramsView' }]} />
            <Toggle
              label={<FormattedMessage {...messages.advancedSearch} />}
              onToggle={this.props.toggleShowFilter}
              defaultToggled={showFilter}
              style={{ width: '200px', float: 'right' }}
            />
            <SearchField value={searchText} onSubmit={this.handleSubmit} />
            {showFilter ? <FilterList filtersMap={filters} setFilterItems={this.props.setFilterItems} filtersData={filtersData} /> : null}
            {gallery}
          </Slide>
          </div>
          <div>
          <Slide>
            Sin implementar
          </Slide>
          </div>
          <div>
          <Slide>
            También sin implementar
          </Slide>
          </div>
        </SwipeableViews>
      </View>

    )
  }
}

MaterialsView.propTypes = {
  requestMaterials: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  filters: PropTypes.instanceOf(Map),
  showFilter: PropTypes.bool,
  setFilterItems: PropTypes.func.isRequired,
  visibleMaterials: PropTypes.arrayOf(PropTypes.object),
  // Injected by React Router
  router: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.number),
  filtersData: PropTypes.instanceOf(Map)
}


const mapStateToProps = (state, ownProps) => ({
  filters: filtersSelector(state),
  showFilter: showFiltersSelector(state),
  locale: localeSelector(state),
  loading: loadingSelector(state),
  searchResults: searchResultsSelector(state, ownProps),
  visibleMaterials: visibleMaterialsSelector(state, ownProps),
  filtersData: state.getIn(['configuration', 'filtersData'])
})

const mapDispatchToProps = (dispatch) => ({
  requestMaterials: (locale, searchText) => {
    dispatch(materials.request(locale, searchText))
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  },
  setFilterItems: (filter, filterItem) => {
    dispatch(setFilterItems(filter, filterItem))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MaterialsView))

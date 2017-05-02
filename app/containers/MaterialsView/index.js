/*
 *
 * MaterialsView
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import SearchBox from 'components/SearchBox'
// import MaterialList from 'components/MaterialList'
import View from 'components/View'
import { withRouter } from 'react-router'
import { getFilteredItems } from 'utils'
import { materials, toggleShowFilter } from './actions'

class MaterialsView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (this.props.params.searchText) {
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
    const { children, showFilter, filters, visibleMaterials } = this.props
    const searchText = this.props.params.searchText
    const gallery = visibleMaterials.length > 0 ? React.cloneElement(children, { materials: visibleMaterials }) : null
    // this code in return is not so good if children changes (search, categories...)
    //  {visibleMaterials.length > 0 && <MaterialList materials={visibleMaterials} />}
    //
    return (
      <View>
        <Helmet
          title='PictogramsView'
          meta={[
            { name: 'description', content: 'Description of PictogramsView' }
          ]}
        />
        <SearchBox
          value={searchText}
          onSubmit={this.handleSubmit}
          onToggleFilter={this.props.toggleShowFilter}
          filters={filters}
          showFilter={showFilter}
        />
        {gallery}
      </View>
    )
  }
}

MaterialsView.propTypes = {
  // Injected by React Redux
  // loadAutocomplete: PropTypes.func.isRequired,
  requestMaterials: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  params: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  showFilter: PropTypes.bool,
  visibleMaterials: PropTypes.arrayOf(PropTypes.object),
  // Injected by React Router
  children: PropTypes.node,
  router: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired
}


const mapStateToProps = (state, ownProps) => {
  const filters = state.getIn(['configuration', 'materials', 'filters'])
  const showFilter = state.getIn(['materialsView', 'showFilter'])
  const locale = state.get('language').get('locale')
  const activeFilters = state.getIn(['materialsView', 'filters'])
  const materialList = state.getIn(['materialsView', 'search', locale, ownProps.params.searchText]) || []
  const visibleMaterials = activeFilters && activeFilters.size > 0 ? getFilteredItems(materialList, activeFilters.toJS()) : materialList
  // const visibleMaterials = getFilteredItems(materialList, activeFilters)
  // const visibleMaterials = getVisibleMaterials (materials, )
  return ({
    filters,
    showFilter,
    visibleMaterials,
    locale
  })
}

const mapDispatchToProps = (dispatch) => ({
  requestMaterials: (locale, searchText) => {
    dispatch(materials.request(locale, searchText))
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MaterialsView))

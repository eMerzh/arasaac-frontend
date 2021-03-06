/*
 *
 * Materials View reducer
 *
 */

import { fromJS, List, Map } from 'immutable'
import {
  MATERIALS,
  NEW_MATERIALS,
  AUTHORS,
  TOGGLE_FILTERS,
  TOGGLE_SETTINGS,
  SHOW_SETTINGS,
  SET_FILTER_ITEMS,
  MATERIAL_PUBLISH,
  MATERIAL_REMOVE,
  MATERIAL,
  MATERIAL_UPDATE,
  MATERIALS_NOT_PUBLISHED,
  SHOW_FILTERS
} from './actions'

export const initialState = fromJS({
  showFilter: false,
  showSettings: false,
  loading: false,
  error: false,
  search: {},
  searchText: '',
  filters: {
    activities: List(),
    areas: List(),
    languages: List()
  },
  materials: {},
  newMaterials: [],
  authors: []
})

function materialsViewReducer(state = initialState, action) {
  let newMaterial
  switch (action.type) {

    case MATERIAL.REQUEST:
    case MATERIALS.REQUEST:
    case MATERIAL_REMOVE.REQUEST:
    case MATERIAL_PUBLISH.REQUEST:
    case MATERIAL_UPDATE.REQUEST:
    case NEW_MATERIALS.REQUEST:
    case MATERIALS_NOT_PUBLISHED.REQUEST:
    case AUTHORS.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case MATERIAL.SUCCESS:
      newMaterial = fromJS(action.payload.data || {})
      return state
        .set('loading', false)
        .setIn(['materials', action.payload.data.idMaterial], newMaterial)
    case MATERIAL_REMOVE.SUCCESS:
      // need parseInt when remove from MaterialView
      const { idMaterial } = (action.payload.data)
      const newMaterials = state.get('newMaterials').filter((item) => item !== parseInt(idMaterial))
      return state
        .set('loading', false)
        .deleteIn(['materials', idMaterial])
        .set('search', Map()) // we remove searches as it can be there....
        .set('newMaterials', newMaterials)
    case MATERIAL_PUBLISH.SUCCESS:
    case MATERIAL_UPDATE.SUCCESS:
      newMaterial = fromJS(action.payload.data || {})
      return state
        .set('loading', false)
        .setIn(['materials', action.payload.data.idMaterial], newMaterial)
    case MATERIAL_REMOVE.FAILURE:
    case MATERIAL_PUBLISH.FAILURE:
    case MATERIALS_NOT_PUBLISHED.FAILURE:
    case MATERIAL_UPDATE.FAILURE:
    case MATERIALS.FAILURE:
    case AUTHORS.FAILURE:
    case NEW_MATERIALS.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)

    case MATERIALS.SUCCESS:
      newMaterial = fromJS(action.payload.data.entities.materials || {})
      // we change searchType for reducer, for authors, activities and areas we don't need locale
      // activity or area could also be mixed with a content searchText
      return action.payload.searchType === 'content' ?
        state
          .set('loading', false)
          .setIn(['search', action.payload.locale, action.payload.searchText], action.payload.data.result)
          .mergeIn(['materials'], newMaterial)
        :
        state
          .set('loading', false)
          .setIn(['search', action.payload.searchType, action.payload.searchText], action.payload.data.result)
          .mergeIn(['materials'], newMaterial)
    // case MATERIALS_NOT_PUBLISHED.SUCCESS:
    //   const notPublishedMaterials = fromJS(action.payload.data || [])
    //   return state
    //     .set('loading', false)
    //     .mergeIn(['materials'], notPublishedMaterials)
    case AUTHORS.SUCCESS:
      return state
        .set('loading', false)
        .set('authors', action.payload.data)
    case NEW_MATERIALS.SUCCESS:
      newMaterial = fromJS(action.payload.data.entities.materials || {})
      return state
        .set('loading', false)
        .set('newMaterials', action.payload.data.result)
        .mergeIn(['materials'], newMaterial)
    case MATERIALS_NOT_PUBLISHED.SUCCESS:
      newMaterial = fromJS(action.payload.data.entities.materials || {})
      return state
        .set('loading', false)
        .mergeIn(['materials'], newMaterial)
    case TOGGLE_FILTERS:
      return state
        .set('showFilter', !state.get('showFilter'))
        .set('showSettings', false)
    case TOGGLE_SETTINGS:
      return state
        .set('showSettings', !state.get('showSettings'))
        .set('showFilter', false)
    case SHOW_SETTINGS:
      return state
        .set('showSettings', true)
        .set('showFilter', false)
    case SHOW_FILTERS:
      return state
        .set('showSettings', false)
        .set('showFilter', true)
    case SET_FILTER_ITEMS:
      return state
        .setIn(['filters', action.payload.filter], action.payload.values)
    default:
      return state
  }
}

export default materialsViewReducer

/*
 *
 * PictogramsView reducer
 *
 */

import { fromJS } from 'immutable'
import { PICTOGRAMS, AUTOCOMPLETE, SHOW_FILTERS } from './actions'

const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  search: fromJS({})
})

function pictogramsViewReducer(state = initialState, action) {
  let newData = {}
  switch (action.type) {
    case PICTOGRAMS.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case PICTOGRAMS.SUCCESS:
      newData[action.searchText] = action.data
      newData = fromJS({ search: newData })
      return state
        .mergeDeep(newData)
        .set('loading', false)
    case PICTOGRAMS.FAILURE:
      return state
        .set('error', action.error)
        .set('loading', false)
    case AUTOCOMPLETE.REQUEST:
      return state
    case AUTOCOMPLETE.SUCCESS:
      return state
        .setIn(['autocomplete', action.searchText], action.data)
    case AUTOCOMPLETE.FAILURE:
      return state
        .setIn(['autocomplete', action.searchText], action.data)
    case SHOW_FILTERS:
      return state
        .set('showFilter', !state.get('showFilter'))
    default:
      return state
  }
}

export default pictogramsViewReducer

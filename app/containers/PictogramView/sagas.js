import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
import { PICTOGRAM, pictogram } from './actions'
// import { AUTOCOMPLETE } from '../PictogramsView/actions'

function* pictogramGetData(action) {
  try {
    const { locale } = action.payload
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(pictogram.success(locale, response))
    yield put(hideLoading())
  } catch (error) {
    yield put(hideLoading())
    yield put(pictogram.failure(error.message))
  } finally {

    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}

export function* pictogramData() {
  const watcher = yield takeLatest(PICTOGRAM.REQUEST, pictogramGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// All sagas to be loaded
export default [pictogramData]

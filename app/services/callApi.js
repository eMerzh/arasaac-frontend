import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import { API_ROOT } from './config'


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, config, schema) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  console.log (fullUrl)
  /* const data = { type: 'SIGNUP_REQUEST',
    name: 'JUAN D. BURRO ALAEZ',
    surname: 'ALAEZ',
    email: 'juandacorreo@gmail.com',
    username: 'adsf',
    password: 'asdf'
  } */
  // const options = { method: 'GET', header: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
  return fetch(fullUrl) // could have options!
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json)
        }
      // const camelizedJson = camelizeKeys(json)
      // const nextPageUrl = getNextPageUrl(response)
      /*
        return Object.assign({},
          normalize(camelizedJson, schema),
          { nextPageUrl }
        )
      })
      */

        return json
      })
  )
}

export default callApi

import {combineReducers} from 'redux'
import {
  AUTH_LOGIN,
  AUTH_LOGOUT
} from './actions'

export default combineReducers({
  auth
})

function auth(state = null, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        user: action.data.user
      }
    case AUTH_LOGOUT:
      return null
    default:
      return state
  }
}

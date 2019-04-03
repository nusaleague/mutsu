import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'

export function initializeStore(initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  if (module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(reducer))
  }

  return store
}

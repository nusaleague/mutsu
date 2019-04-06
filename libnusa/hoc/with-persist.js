import React from 'react'

export default function withPersist(key, defaultState = {}, opts = {}) {
  function saveState(props, state) {
    const {
      storage = sessionStorage
    } = opts

    const storageKey = typeof key === 'function' ? key(props) : key
    const data = JSON.stringify(state)
    storage.setItem(storageKey, data)
  }

  function loadState(props) {
    const {
      storage = sessionStorage
    } = opts

    const storageKey = typeof key === 'function' ? key(props) : key
    const data = storage.getItem(storageKey)
    return data ? JSON.parse(data) : defaultState
  }

  return Component => {
    function ComponentWithPersist(props) {
      return (
        <Component
          {...props}
          initialState={loadState(props)}
          persist={state => saveState(props, state)}
        />
      )
    }

    return ComponentWithPersist
  }
}

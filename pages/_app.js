import React from 'react'
import Head from 'next/head'
import NextApp, {Container} from 'next/app'
import Error from 'next/error'
import {Provider} from 'react-redux'
import initializeIconLibrary from '../lib/font-awesome'
import {ENV_SERVER} from '../lib/env'
import {initializeStore} from '../store'
import {client} from '../lib/endpoint'
import {authLogin} from '../store/actions'

// eslint-disable-next-line import/no-unassigned-import
import '../styles/main'

initializeIconLibrary()

export default class App extends NextApp {
  static async getInitialProps({Component, ctx}) {
    const props = {}

    const store = getStore()
    ctx.store = store

    if (typeof Component.getInitialProps === 'function') {
      try {
        props.pageProps = await Component.getInitialProps(ctx)
      } catch (error) {
        if (error.statusCode) {
          props.error = {
            statusCode: error.statusCode
          }
        } else {
          // TODO Handle error without status code
          throw error
        }
      }
    }

    props.initialState = ctx.store.getState()

    return props
  }

  constructor(props) {
    super(props)
    this.store = getStore(props.initialState)
  }

  componentDidMount() {
    if (!this.store.getState().auth) {
      this.store.dispatch(async dispatch => {
        const user = await client.get('auth').json()
        if (user) {
          dispatch(authLogin(user))
        }
      }).catch(console.error)
    }
  }

  render() {
    const {error} = this.props
    if (error) {
      // TODO Handle error without status code
      return <Error statusCode={error.statusCode}/>
    }

    const {Component, pageProps} = this.props
    return (
      <>
        <Head>
          {/* Meta tag viewport untuk Bootstrap */}
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        </Head>
        <Container>
          <Provider store={this.store}>
            <Component {...pageProps}/>
          </Provider>
        </Container>
      </>
    )
  }
}

function getStore(initialState = {}) {
  const REDUX_STORE = Symbol('REDUX_STORE')
  if (ENV_SERVER) {
    return initializeStore(initialState)
  }

  if (!window[REDUX_STORE]) {
    const store = initializeStore(loadState(initialState))

    store.subscribe(() => {
      saveState(store.getState())
    })

    window[REDUX_STORE] = store
  }

  return window[REDUX_STORE]
}

function saveState(state) {
  const data = {
    version: process.env.BUILD_ID,
    time: Date.now(),
    state
  }

  localStorage.setItem('redux-state', JSON.stringify(data))
}

function loadState(defaultState = {}) {
  const json = localStorage.getItem('redux-state')
  if (!json) {
    return defaultState
  }

  const {version, time, state} = JSON.parse(json)

  if (version !== process.env.BUILD_ID) {
    return defaultState
  }

  if ((Date.now() - time) > 60 * 60 * 1000) {
    return defaultState
  }

  return state
}

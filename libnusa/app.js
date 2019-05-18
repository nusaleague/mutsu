import React from 'react'
import Error from 'next/error'
import Head from 'next/head'
import NextApp, {Container} from 'next/app'
import {Provider} from 'react-redux'

// eslint-disable-next-line import/no-unassigned-import
import '../styles/main'

export default (getStore, ComponentContainer = null) => {
  return class App extends NextApp {
    static async getInitialProps({Component, ctx}) {
      const props = {}

      const store = getStore()
      ctx.store = store

      if (typeof Component.getInitialProps === 'function') {
        try {
          props.pageProps = await Component.getInitialProps(ctx)
        } catch (error) {
          const {statusCode = 500} = error

          props.error = {statusCode}

          if (ctx.res) {
            ctx.res.statusCode = statusCode
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

    render() {
      const {error} = this.props
      if (error) {
        // TODO Buat custom error handler view.
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

              {ComponentContainer ? (
                <ComponentContainer>
                  <Component {...pageProps}/>
                </ComponentContainer>
              ) : (
                <Component {...pageProps}/>
              )}

            </Provider>
          </Container>
        </>
      )
    }
  }
}

export function saveState(state) {
  const data = {
    version: process.env.BUILD_ID,
    time: Date.now(),
    state
  }

  localStorage.setItem('redux-state', JSON.stringify(data))
}

export function loadState(defaultState = {}, maxAge = null) {
  const json = localStorage.getItem('redux-state')
  if (!json) {
    return defaultState
  }

  const {version, time, state} = JSON.parse(json)

  if (version !== process.env.BUILD_ID) {
    return defaultState
  }

  if (typeof maxAge === 'number') {
    if ((Date.now() - time) > maxAge) {
      return defaultState
    }
  }

  return state
}

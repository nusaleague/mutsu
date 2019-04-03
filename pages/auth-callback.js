import React from 'react'
import Router from 'next/router'

export default class AuthCallbackPage extends React.Component {
  componentDidMount() {
    const next = sessionStorage.getItem('authRedirect') || '/'
    sessionStorage.removeItem('authRedirect')

    Router.replace(next)
  }

  render() {
    return null
  }
}

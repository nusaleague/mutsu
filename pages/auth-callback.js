import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {connect} from 'react-redux'
import {authLogin} from '../store/actions'
import {client} from '../libnusa/api'

export class AuthCallbackPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(async dispatch => {
      const user = await client.get('auth').json()
      if (!user) {
        throw new Error('Expected user to be authenticated')
      }

      dispatch(authLogin(user))

      const next = sessionStorage.getItem('auth-redirect') || '/'
      sessionStorage.removeItem('auth-redirect')

      await Router.replace(next)
    }).catch(console.error)
  }

  render() {
    return null
  }
}

export default connect()(AuthCallbackPage)

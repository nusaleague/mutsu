import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { connect } from 'react-redux'
import { acall } from '../util'

export default function withCheckAuth(redirect) {
  return Component => {
    class ComponentWithAuth extends React.Component {
      static propTypes = {
        auth: PropTypes.object
      }

      static defaultProps = {
        auth: null
      }

      checkAuth() {
        if (!this.props.auth) {
          acall(async () => {
            const url = typeof redirect === 'function' ? redirect() : redirect
            await Router.push(url)
          })
        }
      }

      componentDidMount() {
        this.checkAuth()
      }

      componentDidUpdate() {
        this.checkAuth()
      }

      render() {
        if (!this.props.auth) {
          return null
        }

        return <Component {...this.props} />
      }
    }

    return connect(state => ({
      auth: state.auth || null
    }))(ComponentWithAuth)
  }
}

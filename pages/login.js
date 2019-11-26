import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { connect } from 'react-redux'
import LoginSocial from '../components/LoginSocial'

export class LoginSocialPage extends React.Component {
  static propTypes = {
    next: PropTypes.string,
    info: PropTypes.string,
    auth: PropTypes.object
  }

  static defaultProps = {
    next: '/',
    info: null,
    auth: null
  }

  static async getInitialProps({ query }) {
    const { next, info } = query
    return { next, info }
  }

  state = {
    show: false
  }

  componentDidMount() {
    if (this.props.auth) {
      Router.push(this.props.next).catch(console.error)
      return
    }

    this.setState({
      show: true
    })
  }

  render() {
    if (!this.state.show) {
      return null
    }

    const { next, info } = this.props

    return (
      <div className="container-center-card login-container">
        <LoginSocial {...{ next, info }} />
      </div>
    )
  }
}

export default connect(state => {
  return { auth: state.auth || null }
})(LoginSocialPage)

import React from 'react'
import PropTypes from 'prop-types'

export default class FullTimeMatchData extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    return <pre>{JSON.stringify(this.props.data, null, 2)}</pre>
  }
}

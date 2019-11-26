import React from 'react'
import PropTypes from 'prop-types'
import { Container, Button } from 'reactstrap'
import Router from 'next/router'
import Footer from '../Footer'

export default class LegalContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  render() {
    return (
      <>
        <Container className="legal">
          {this.props.children}
          <div className="legal-back">
            <Button color="link" onClick={() => Router.back()}>
              &larr; Kembali
            </Button>
          </div>
        </Container>
        <Footer />
      </>
    )
  }
}

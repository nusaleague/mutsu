import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {Card, CardHeader, CardBody, CardFooter, Button, Container, Row, Col, UncontrolledAlert} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class LoginSocial extends React.Component {
  static propTypes = {
    next: PropTypes.string,
    info: PropTypes.string
  }

  static defaultProps = {
    next: '/',
    info: null
  }

  handleLogin = provider => {
    sessionStorage.setItem('auth-redirect', this.props.next)

    const params = new URLSearchParams()
    params.append('next', 'web')

    const url = `${process.env.ENDPOINT}/auth/${provider}?${params}`
    location.replace(url)
  }

  render() {
    const {info} = this.props

    return (
      <Card className="card-login">
        <CardHeader>
          <h1>Masuk ke web Nusa League</h1>
        </CardHeader>
        <CardBody>

          {(
            {
              'require-auth': (
                <UncontrolledAlert color="info">
                    Anda harus masuk untuk dapat melihat halaman yang dituju.
                </UncontrolledAlert>
              )
            }
          )[info] || null}

          <p>Silakan gunakan akun media sosial Anda untuk masuk.</p>

          <Container fluid>
            <Row>
              <Col sm="6">
                <Button block className="btn-facebook" onClick={() => this.handleLogin('facebook')}>
                  <FontAwesomeIcon fixedWidth icon={['fab', 'facebook']}/> Facebook
                </Button>
              </Col>
              {/* Twitter di-disable dulu untuk sekarang.
              <Col sm="4">
                <Button block className="btn-twitter" onClick={() => this.handleLogin('twitter')}>
                  <FontAwesomeIcon fixedWidth icon={['fab', 'twitter']}/> Twitter
                </Button>
              </Col>
              */}
              <Col sm="6">
                <Button block className="btn-google" onClick={() => this.handleLogin('google')}>
                  <FontAwesomeIcon fixedWidth icon={['fab', 'google']}/> Google
                </Button>
              </Col>
            </Row>
          </Container>

        </CardBody>
        <CardFooter>
          Dengan masuk ke dalam web Nusa League, Anda menyetujui <Link href="/ua"><a>Persetujuan Pengguna</a></Link> dan <Link href="/privacy"><a>Kebijakan Privasi</a></Link> Nusa League.
        </CardFooter>
      </Card>
    )
  }
}

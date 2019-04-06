import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import Link from 'next/link'

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <Container>
          <Row>
            <Col className="footer-left" sm="6">
              <img className="footer-logo" src="/static/nusa-footer-logo.png" alt="Nusa Mascot League"/> &copy; 2019 Nusa Mascot League
            </Col>
            <Col className="footer-right" sm="6">
              <ul className="footer-links">
                <li><Link href="/toc"><a>Syarat dan Ketentuan</a></Link></li>
                <li><Link href="/privacy"><a>Kebijakan Privasi</a></Link></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

import React from 'react'
import { Container, Card, CardBody } from 'reactstrap'
import Footer from '../../components/Footer'

export default class VoteSuccessPage extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Card className="card-fixture card-fixture-voted">
            <CardBody>
              <h1>Voting sudah diterima</h1>
              <p>
                Terima kasih sudah memilih para maskot untuk pertandingan kali
                ini.
              </p>
              <p>Nantikan pertandingan berikutnya!</p>
            </CardBody>
          </Card>
        </Container>
        <Footer />
      </>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import Error from 'next/error'
import {BadRequest} from 'http-errors'
import {Container, Card, CardBody} from 'reactstrap'
import Footer from '../../components/Footer'
import ConnectVoteFixture from '../../components/VoteFixture'
import {shuffleDeep, checkAuth} from '../../lib/util'
import {rpc} from '../../lib/endpoint'
import {ENV_SERVER} from '../../lib/env'

export default class VotePage extends React.Component {
  static propTypes = {
    userHasVoted: PropTypes.bool.isRequired,
    fixtureData: PropTypes.object
  }

  static defaultProps = {
    fixtureData: null
  }

  static async getInitialProps(ctx) {
    if (await checkAuth(ctx)) {
      return
    }

    const {fixture: fixtureSlug} = ctx.query
    if (!fixtureSlug) {
      throw new BadRequest()
    }

    const initialProps = {}

    const fixtureData = shuffleDeep(await rpc('getFixture', [fixtureSlug]))
    initialProps.fixtureData = fixtureData

    const userId = ctx.store.getState().auth.user.id
    const fixtureId = fixtureData.vote_fixture.id
    initialProps.userHasVoted = Boolean(await rpc('getResponse', [userId, fixtureId]))

    return initialProps
  }

  render() {
    if (ENV_SERVER) {
      return null
    }

    if (this.props.userHasVoted) {
      return (
        <>
          <Container>

            <Card className="card-fixture card-fixture-voted">
              <CardBody>
                <h1>Kamu sudah mengirimkan voting</h1>
                <p>Kamu sudah mengirimkan pilihan kamu untuk pertandingan kali ini.</p>
                <p>Nantikan pertandingan berikutnya!</p>
              </CardBody>
            </Card>

          </Container>
          <Footer/>
        </>
      )
    }

    const {fixtureData} = this.props

    if (!fixtureData) {
      return <Error statusCode={404}/>
    }

    if (!fixtureData.status) {
      return (
        <>
          <Container>

            <Card className="card-fixture card-fixture-voted">
              <CardBody>
                <h1>Pertandingan sudah ditutup</h1>
                <p>Pertandingan yang kamu tuju sudah ditutup.</p>
                <p>Nantikan pertandingan berikutnya!</p>
              </CardBody>
            </Card>

          </Container>
          <Footer/>
        </>
      )
    }

    return <ConnectVoteFixture data={fixtureData}/>
  }
}

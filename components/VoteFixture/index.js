import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import groupBy from 'lodash/groupBy'
import {Container, Card, CardImg, CardBody, Button, Input, FormGroup} from 'reactstrap'
import {connect} from 'react-redux'
import VoteDivision from '../VoteDivision'
import {rpc} from '../../lib/endpoint'
import withPersist from '../../lib/hoc/with-persist'
import Footer from '../Footer'

export class VoteFixture extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    persist: PropTypes.func.isRequired,
    initialState: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = this.props.initialState
  }

  handleChoice = (matchId, mascotId) => {
    this.setState(state => {
      if (mascotId) {
        state.choices[matchId] = mascotId
      } else {
        delete state.choices[matchId]
      }

      this.props.persist(state)
      return state
    })
  }

  handleComment = e => {
    const comment = e.target.value || ''

    this.setState(state => {
      state.comment = comment
      this.props.persist(state)
      return state
    })
  }

  handleSubmit = () => {
    (async () => {
      const userId = this.props.user.id
      const fixtureId = this.props.data.vote_fixture.id
      const submitData = {
        comment: this.state.comment || null,
        responses: Object.entries(this.state.choices)
          .map(([matchId, mascotId]) => ({
            matchId: parseInt(matchId, 10),
            mascotId
          }))
      }

      await rpc('submitResponse', [userId, fixtureId, submitData])
      await Router.push('/vote/success')
    })().catch(error => alert(error.message)) // eslint-disable-line no-alert
  }

  render() {
    const {data} = this.props
    const {choices, comment} = this.state

    const divisionMatches = groupBy(
      data.vote_match.map(match => ({
        ...match,
        ...(choices[match.id] ? {choice: choices[match.id]} : {}),
        mascots: data.vote_match_mascot
          .filter(matchMascot => matchMascot.match_id === match.id)
          .map(matchMascot => {
            const mascot = data.mascot.find(mascot => mascot.id === matchMascot.mascot_id)
            const org = data.org.find(org => org.id === mascot.org_id)
            return {...mascot, org}
          })
      })),
      'division'
    )

    const chosenIds = Object.keys(this.state.choices)
    const isAllChosen = !data.vote_match.find(match => !chosenIds.includes(String(match.id)))

    return (
      <>
        <Container>

          <Card className="card-fixture card-fixture-intro">
            <CardImg src="/static/vote-banner.jpg" alt="Nusaimoe banner"/>
            <CardBody>
              <p>Selamat datang di Nusaimoe!</p>
              <p>Tentukan maskot favorit kalian dengan berpartisipasi dalam pertandingan mingguan dari setiap divisi Nusaimoe.</p>
            </CardBody>
          </Card>

          {
            Object.entries(divisionMatches)
              .map(([division, matches]) => (
                <VoteDivision
                  key={division}
                  division={division}
                  matches={matches}
                  handleChoice={this.handleChoice}
                />
              ))
          }

          <Card className="card-fixture">
            <CardBody>
              {isAllChosen ? (
                <>
                  <p>Terima kasih sudah memilih para maskot pada pertandingan minggu ini!</p>
                  <p>Silakan tinggalkan komentar, kritik, atau saran kamu terkait pertandingan kali ini di bawah ini.</p>
                  <FormGroup>
                    <Input type="textarea" value={comment} maxLength="2000" onChange={this.handleComment}/>
                  </FormGroup>
                  <Button block type="button" onClick={() => this.handleSubmit()}>Kirim vote</Button>
                </>
              ) : (
                <>
                  <p>Silakan melengkapi pilihan kamu untuk pertandingan-pertandingan di atas.</p>
                  <Button disabled block type="button">Kirim vote</Button>
                </>
              )}
            </CardBody>
          </Card>

        </Container>
        <Footer/>
      </>
    )
  }
}

export default connect(
  state => {
    return {
      user: state.auth.user
    }
  }
)(withPersist(
  props => `fixture-choices-${props.data.vote_fixture.id}`,
  {
    choices: {},
    comment: ''
  }
)(VoteFixture))

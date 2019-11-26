import React from 'react'
import { Container } from 'reactstrap'
import Standings from '../components/Standings'

export default class StandingsPage extends React.Component {
  render() {
    return (
      <Container>
        <h1>Klasemen Nusaimoe 2019</h1>
        <Standings />
      </Container>
    )
  }
}

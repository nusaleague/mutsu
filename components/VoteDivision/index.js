import React from 'react'
import PropTypes from 'prop-types'
import classes from 'classnames'
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap'
import VoteMatch from '../VoteMatch'

export default class VoteDivision extends React.Component {
  static propTypes = {
    division: PropTypes.string.isRequired,
    matches: PropTypes.array.isRequired,
    handleChoice: PropTypes.func.isRequired
  }

  state = {
    isOpen: true
  }

  toggleOpen = () => {
    this.setState(state => {
      return { isOpen: !state.isOpen }
    })
  }

  render() {
    const { division, matches } = this.props

    return (
      <Card
        className={classes('card-fixture', 'card-fixture-division', division)}
      >
        <CardHeader className={division} onClick={this.toggleOpen}>
          <img
            src={`${process.env.FILE_URL}/division-banner/${division}.jpg`}
          />
          {/*
            <h1 className="title">Divisi {toProperCase(division)}</h1>
            <div className="icon"><FontAwesomeIcon icon="bars"/></div>
          */}
        </CardHeader>
        <Collapse isOpen={this.state.isOpen}>
          <CardBody>
            {matches.map(match => (
              <VoteMatch
                key={match.id}
                match={match}
                handleChoice={this.props.handleChoice}
              />
            ))}
          </CardBody>
        </Collapse>
      </Card>
    )
  }
}

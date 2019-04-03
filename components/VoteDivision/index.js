import React from 'react'
import PropTypes from 'prop-types'
import classes from 'classnames'
import {Card, CardBody, CardHeader, Collapse} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import VoteMatch from '../VoteMatch'
import {toProperCase} from '../../lib/util'

export default class VoteDivision extends React.Component {
  static propTypes = {
    division: PropTypes.string.isRequired,
    matches: PropTypes.array.isRequired,
    handleChoice: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: true
    }
  }

  toggleOpen = () => {
    this.setState(state => {
      return {isOpen: !state.isOpen}
    })
  }

  render() {
    const {division, matches} = this.props

    return (
      <Card className={classes('fixture', 'division', division)}>
        <CardHeader className={division} onClick={this.toggleOpen}>
          <h1 className="title">Divisi {toProperCase(division)}</h1>
          <div className="icon"><FontAwesomeIcon icon="bars"/></div>
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

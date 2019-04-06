import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'reactstrap'
import VoteMascot from '../VoteMascot'

export default class VoteMatch extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    handleChoice: PropTypes.func.isRequired
  }

  render() {
    const {match} = this.props
    const [mascotLeft, mascotRight] = match.mascots

    return (
      <div className="match">
        <Row>
          <Col xs="5" className="match-mascot left">
            <VoteMascot
              placement="left"
              name={mascotLeft.short_name}
              orgName={mascotLeft.org.short_name}
              slug={mascotLeft.slug}
              color={mascotLeft.color_hex}
              description={mascotLeft.description}
              selected={match.choice ? match.choice === mascotLeft.id : null}
              onChoose={() => this.props.handleChoice(match.id, mascotLeft.id)}
            />
          </Col>
          <Col xs="2" className="match-vs"/>
          <Col xs="5"className="match-mascot right">
            <VoteMascot
              placement="right"
              name={mascotRight.short_name}
              orgName={mascotRight.org.short_name}
              slug={mascotRight.slug}
              color={mascotRight.color_hex}
              description={mascotRight.description}
              selected={match.choice ? match.choice === mascotRight.id : null}
              onChoose={() => this.props.handleChoice(match.id, mascotRight.id)}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

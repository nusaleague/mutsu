import React from 'react'
import PropTypes from 'prop-types'
import classes from 'classnames'
import {Card, CardImg, CardBody, Popover, PopoverBody} from 'reactstrap'

export default class VoteMascot extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    orgName: PropTypes.string.isRequired,
    placement: PropTypes.oneOf(['left', 'right']).isRequired,
    description: PropTypes.string,
    selected: PropTypes.bool,
    onChoose: PropTypes.func
  }

  static defaultProps = {
    description: null,
    selected: null,
    onChoose: null
  }

  constructor(props) {
    super(props)

    this.state = {
      showDescription: false
    }
  }

  toggleDescription = () => {
    this.setState(state => ({showDescription: !state.showDescription}))
  }

  render() {
    const {
      color,
      name,
      description,
      slug,
      orgName,
      placement,
      selected,
      onChoose
    } = this.props

    const id = `mascotCard_${slug}`

    return (
      <>
        <Card
          id={id}
          className={classes('card-mascot', placement, {selected})}
          style={{color}}
          onClick={onChoose}
        >
          <div className={classes('card-overlay', {'not-selected': selected === false})}/>

          <CardImg top
            src={`${process.env.FILE_URL}/avatar/${slug}.png`}
            alt={name}
          />

          <CardBody
            style={{
              background: color,
              color: computeTextColor(color)
            }}
          >
            <div>{name}</div>
            <div className="org-name">{orgName}</div>
          </CardBody>
        </Card>
        {description ? (
          <Popover
            target={id}
            placement="auto-start"
            trigger="hover"
            isOpen={this.state.showDescription}
            toggle={this.toggleDescription}
          >
            <PopoverBody>{description}</PopoverBody>
          </Popover>
        ) : null}
      </>
    )
  }
}

function computeTextColor(backgroundColorHex) {
  // https://github.com/twbs/bootstrap/blob/3bf08d87c9bedfe7cf4a0d52eb551d21755d9697/scss/_variables.scss
  const THRESHOLD = 150 / 255
  const COLOR_DARK = '#212529'
  const COLOR_LIGHT = '#fff'

  const [r, g, b] = /#(.{2})(.{2})(.{2})/g.exec(backgroundColorHex)
    .slice(1, 4)
    .map(hex => Number.parseInt(hex, 16) / 255)

  // https://github.com/twbs/bootstrap/blob/v4-dev/scss/_functions.scss
  const lum = ((r * 299) + (g * 587) + (b * 114)) / 1000

  return lum > THRESHOLD ? COLOR_DARK : COLOR_LIGHT
}

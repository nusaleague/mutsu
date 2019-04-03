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
          className={classes('mascot', placement, {selected})}
          style={{color}}
          onClick={onChoose}
        >
          <div className={classes('overlay', {'not-selected': selected === false})}/>

          <CardImg top
            src={`${process.env.FILE_URL}/avatar/${slug}.png`}
            alt={name}
          />

          <CardBody
            className="mascot-text"
            style={{
              background: color,
              color: computeTextColor(color)
            }}
          >
            <div className="name">{name}</div>
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
  const [r, g, b] = /#(.{2})(.{2})(.{2})/g.exec(backgroundColorHex)
    .slice(1, 4)
    .map(hex => Number.parseInt(hex, 16) / 255)

  // https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
  const lum = ((r * 299) + (g * 587) + (b * 114)) / 1000

  return lum > 0.5 ? '#000' : '#fff'
}

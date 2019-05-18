import React from 'react'
import PropTypes from 'prop-types'
import {Table} from 'reactstrap'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import {rpc} from '../../libnusa/api'

export default class Standings extends React.Component {
  constructor() {
    super()

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    (async () => {
      this.setState({
        data: await rpc('getStandings', ['nusaimoe', '2019'])
      })
    })().catch(console.error)
  }

  render() {
    if (!this.state.data) {
      return 'Please wait...'
    }

    const standings = groupBy(
      this.state.data.standings.sort((a, b) => a.division.localeCompare(b.division)),
      'division'
    )

    for (const division of Object.keys(standings)) {
      standings[division] = standings[division].sort(compareRow)
    }

    for (const table of Object.values(standings)) {
      let dec = 0
      for (let i = 0; i < table.length; i++) {
        table[i].rank = i + 1 - dec

        if (i + 1 < table.length) {
          const cmp = compareRow(table[i], table[i + 1])
          if (cmp === 0) {
            dec++
          }
        }
      }
    }

    return Object.entries(standings).map(([division, table]) => (
      <div key={division}>
        <h2>Divisi {division.replace(/^./, x => x.toUpperCase())}</h2>
        <StandingsTable data={table} mascots={keyBy(this.state.data.mascot, 'id')}/>
      </div>
    ))
  }
}

function StandingsTable({mascots, data: rows}) {
  return (
    <Table striped className="standings-table">
      <thead>
        <tr>
          <th>Pos</th>
          <th colSpan="2">Maskot</th>
          <th>P</th>
          <th>M</th>
          <th>S</th>
          <th>K</th>
          <th>Skor</th>
          <th>Poin</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          const mascot = mascots[row.mascot_id]
          return (
            <tr key={mascot.id}>
              <th>{row.rank}</th>
              <td className="td-mascot-image">
                <img src={`${process.env.FILE_URL}/banner/${mascot.slug}.png`}/>
              </td>
              <td className="td-mascot-name">
                {mascot.short_name}
              </td>
              <td>{row.play}</td>
              <td>{row.win}</td>
              <td>{row.draw}</td>
              <td>{row.lose}</td>
              <td>{row.score}</td>
              <td>{row.points}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

StandingsTable.propTypes = {
  mascots: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
}

function compareRow(a, b) {
  if (a.points !== b.points) {
    return -(a.points - b.points)
  }

  if (a.score !== b.score) {
    return -(a.score - b.score)
  }

  if (a.win !== b.win) {
    return -(a.win - b.win)
  }

  return 0
}

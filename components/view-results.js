import React from 'react'
import {Form, FormGroup, Col, Input, Row, Button, Table} from 'reactstrap'
import _ from 'lodash'
import {rpc} from '../libnusa/api'
import {acall} from '../libnusa/util'

const COMP_DISPLAY = {
  nusaimoe: 'Nusaimoe',
  nusaikemen: 'Nusaikemen'
}

function getStageDisplayText(stage) {
  if (stage.startsWith('g')) {
    return stage.replace('g', 'Week ')
  }

  console.warn(`Unknown stage: ${stage}`)
  return stage
}

export default class ViewResults extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    }
  }

  updateStages() {
    acall(async () => {
      const comp = document.querySelector('#ViewResults_selectComp').value
      const year = document.querySelector('#ViewResults_selectYear').value

      this.setState({
        stages: await rpc('getAllFinishedStages', [comp, year])
      })
    })
  }

  updateResult() {
    acall(async () => {
      const comp = document.querySelector('#ViewResults_selectComp').value
      const year = document.querySelector('#ViewResults_selectYear').value
      const stage = document.querySelector('#ViewResults_selectStage').value

      this.setState({
        result: await rpc('getFullTimeResult', [comp, year, stage])
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.updateResult()
  }

  componentDidMount() {
    acall(async () => {
      const seasons = await rpc('getAllSeasons')
      const comps = seasons.map(season => season.comp)
      const years = seasons.map(season => season.year)
      const stages = await rpc('getAllFinishedStages', [seasons[0].comp, seasons[0].year])

      this.setState({
        comps,
        years,
        stages
      })

      this.setState({ready: true})
    })
  }

  render() {
    if (!this.state.ready) {
      // TODO Ganti dengan loading spinner
      return null
    }

    return (
      <>
        <Form className="border-bottom border-light py-3" onSubmit={this.handleSubmit}>
          <Row form>
            <Col sm="3">
              <FormGroup>
                <Input type="select" name="select" id="ViewResults_selectComp" value={this.state.selectedComp}>
                  {this.state.comps.map(comp => <option key={comp} value={comp}>{COMP_DISPLAY[comp]}</option>)}
                </Input>
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Input type="select" name="select" id="ViewResults_selectYear" value={this.state.selectedYear}>
                  {this.state.years.map(year => <option key={year}>{year}</option>)}
                </Input>
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup>
                <Input type="select" name="select" id="ViewResults_selectStage" value={this.state.selectedStage}>
                  {this.state.stages.map(stage => <option key={stage} value={stage}>{getStageDisplayText(stage)}</option>)}
                </Input>
              </FormGroup>
            </Col>
            <Col sm="3">
              <Button type="submit">Tampilkan</Button>
            </Col>
          </Row>
        </Form>
        <div>
          {
            this.state.result ? (() => {
              const {result} = this.state
              console.log(result)

              for (const matchMascot of result.matchMascot) {
                const mascotRow = result.mascotRows.find(row => row.id === matchMascot.mascot_id)
                matchMascot.mascotName = mascotRow.short_name
                matchMascot.mascotSlug = mascotRow.slug
              }

              const matches = _.groupBy(result.matchMascot, 'match_id')

              const divisionMatches = {
                anggrek: [],
                bakung: [],
                cempaka: [],
                edelweiss: [],
                kamboja: [],
                kenanga: [],
                melati: [],
                seroja: []
              }

              for (const match of Object.values(matches)) {
                divisionMatches[result.mascotSeasonRows.find(row => row.mascot_id === match[0].mascot_id).division].push(match)
              }

              return Object.entries(divisionMatches).map(([division, matches]) => {
                return (
                  <div key={division}>
                    <h1>Divisi {division.replace(/^./, x => x.toUpperCase())}</h1>
                    <Table striped borderless>
                      <tbody>
                        {matches.map(match => {
                          const [matchLeft, matchRight] = match

                          return (
                            <tr key={match.match_id}>
                              <td><img src={`${process.env.FILE_URL}/banner/${matchLeft.mascotSlug}.png`}/></td>
                              <td>{matchLeft.mascotName}</td>
                              <td>{matchLeft.full_score}</td>
                              <td>vs</td>
                              <td>{matchRight.full_score}</td>
                              <td>{matchRight.mascotName}</td>
                              <td><img src={`${process.env.FILE_URL}/banner/${matchRight.mascotSlug}.png`}/></td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                )
              })
            })() : 'Belum ada hasil untuk minggu tersebut'
          }
        </div>
      </>
    )
  }
}

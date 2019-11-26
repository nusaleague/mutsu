import React from 'react'
import Container from 'reactstrap/lib/Container'
import DefaultLayout from '../components/layout/default'
import ViewResults from '../components/view-results'

export default class ResultsPage extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <Container>
          <ViewResults />
        </Container>
      </DefaultLayout>
    )
  }
}

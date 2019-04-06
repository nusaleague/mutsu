import React from 'react'
import TOCContent from '../assets/toc'
import LegalContainer from '../components/LegalContainer'

export default class TOCPage extends React.Component {
  render() {
    return (
      <LegalContainer>
        <TOCContent/>
      </LegalContainer>
    )
  }
}

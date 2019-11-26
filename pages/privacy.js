import React from 'react'
import PrivacyContent from '../assets/privacy'
import LegalContainer from '../components/LegalContainer'

export default class PrivacyPage extends React.Component {
  render() {
    return (
      <LegalContainer>
        <PrivacyContent />
      </LegalContainer>
    )
  }
}

import React from 'react'
import { Container } from 'reactstrap'
import RegisterForm from '../../components/RegisterForm'
import '../../styles/pages/register' // eslint-disable-line import/no-unassigned-import

export default function RegisterPage() {
  return (
    <div className="RegisterPage_container my-5">
      <Container fluid>
        <div className="RegisterPage_headerImage" />
        <RegisterForm />
      </Container>
    </div>
  )
}

import React from 'react'
import { Container } from 'reactstrap'
import RegisterForm from '../../components/RegisterForm'
import '../../styles/pages/register' // eslint-disable-line import/no-unassigned-import

export default function RegisterPage() {
  return (
    <>
      <img
        src="/static/register-banner.jpg"
        alt="Banner registrasi"
        className="RegisterPage_headerImage"
      />
      <div className="RegisterPage_container my-5">
        <Container fluid>
          <RegisterForm />
        </Container>
      </div>
    </>
  )
}

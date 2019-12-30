import React from 'react'
import { Container } from 'reactstrap'
import '../../styles/pages/register' // eslint-disable-line import/no-unassigned-import

export default function RegisterPage() {
  return (
    <div className="RegisterPage_container my-5">
      <Container fluid>
        <h1>Pendaftaran berhasil</h1>
        <p>Terima kasih telah mendaftarkan maskot Anda!</p>
        <p>Kami akan segera melakukan verifikasi terhadap data maskot Anda.</p>
      </Container>
    </div>
  )
}

import React from 'react'
import { client } from '../libnusa/api'

export default function RegisterPage() {
  const handleSubmit = e => {
    e.preventDefault()

    const [orgLogoFile] = document.querySelector('#inputFileOrgLogo').files
    const [mascotImageFile] = document.querySelector(
      '#inputFileMascotImage'
    ).files
    const data = document.querySelector('#inputData').value

    const formData = new FormData()
    formData.append('orgLogo', orgLogoFile)
    formData.append('mascotImage', mascotImageFile)
    formData.append('data', data)
    ;(async () => {
      await client.post('register', {
        body: formData
      })
      alert('Registrasi berhasil') // eslint-disable-line no-alert
    })().catch(error => {
      alert('Registrasi gagal') // eslint-disable-line no-alert
      console.error(error)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Org logo:{' '}
        <input required id="inputFileOrgLogo" type="file" accept="image/png" />
      </div>
      <div>
        Mascot image:{' '}
        <input
          required
          id="inputFileMascotImage"
          type="file"
          accept="image/png"
        />
      </div>
      <div>
        Data (JSON):
        <textarea required id="inputData" />
      </div>
      <button type="submit">Kirim</button>
    </form>
  )
}

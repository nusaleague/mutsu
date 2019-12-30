import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {
  Form,
  Button,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormText
} from 'reactstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import './style' // eslint-disable-line import/no-unassigned-import
import { client } from '../../libnusa/api'

function ImageFilePreview({ file, ...restProps }) {
  const [url, setURL] = useState(null)

  useEffect(() => {
    if (file && !url) {
      const url = URL.createObjectURL(file)
      setURL(url)
      return
    }

    if (!file && url) {
      URL.revokeObjectURL(url)
      setURL(null)
      return
    }

    return url => URL.revokeObjectURL(url)
  }, [file, url])

  return url ? <img src={url} {...restProps} /> : null
}

ImageFilePreview.propTypes = {
  file: PropTypes.object
}

ImageFilePreview.defaultProps = {
  file: null
}

export default function RegisterForm() {
  const [formValues, setFormValues] = useState({})

  const handleSubmit = e => {
    e.preventDefault()

    if (
      !(
        formValues.orgFacebook ||
        formValues.orgTwitter ||
        formValues.orgInstagram ||
        formValues.orgYoutube
      )
    ) {
      // eslint-disable-next-line no-alert
      alert('Salah satu dari media sosial organisasi harus diisi.')
      return
    }

    if (formValues.orgLogo.size > 512 * 1024) {
      // eslint-disable-next-line no-alert
      alert(
        'Ukuran file logo terlalu besar. Silakan gunakan file dengan ukuran di bawah 500 KB.'
      )
      return
    }

    if (formValues.mascotImage.size > 1024 * 1024) {
      // eslint-disable-next-line no-alert
      alert(
        'Ukuran file logo terlalu besar. Silakan gunakan file dengan ukuran di bawah 500 KB.'
      )
      return
    }

    if (!formValues.recaptchaToken) {
      // eslint-disable-next-line no-alert
      alert('Silakan selesaikan verifikasi reCAPTCHA terlebih dahulu.')
      return
    }

    const data = {}
    for (const [key, value] of Object.entries(formValues)) {
      if (['orgLogo', 'mascotImage', 'recaptchaToken'].includes(key)) {
        continue
      }

      data[key] = value
    }

    const formData = new FormData()
    formData.set('orgLogo', formValues.orgLogo)
    formData.set('mascotImage', formValues.mascotImage)
    formData.set('data', JSON.stringify(data))
    formData.set('recaptchaToken', formValues.recaptchaToken)
    ;(async () => {
      await client.post('register', { body: formData })
      await Router.push('/register/success')
    })().catch(error => {
      // eslint-disable-next-line no-alert
      alert(
        'Mohon maaf, sistem kami sedang mengalami masalah. Silakan coba beberapa saat lagi, dan kontak staf kami jika masalah masih berlanjut.'
      )
      console.error(error)
    })
  }

  const createHandleValue = (name, valueFn = e => e.target.value) => e => {
    setFormValues({
      ...formValues,
      [name]: valueFn(e)
    })
  }

  const handleRecaptchaChange = recaptchaToken => {
    setFormValues({
      ...formValues,
      recaptchaToken
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Form Pendaftaran Nusaimoe 2020</h1>

      <div className="my-5">
        <h2>Organisasi</h2>
        <FormGroup>
          <Label for="register__orgName">Nama organisasi</Label>
          <Input
            required
            type="text"
            id="register__orgName"
            onChange={createHandleValue('orgName')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="register__orgCategory">Kategori organisasi</Label>
          <Input
            required
            type="select"
            id="register__orgCategory"
            onChange={createHandleValue('orgCategory')}
          >
            <option value="" />
            <option value="circle">Lingkar Karya</option>
            <option value="media">Media Berita/Zine</option>
            <option value="community_academic">
              Komunitas Ekstrakurikuler Sekolah/Unit Kegiatan Mahasiswa
            </option>
            <option value="community_regional">
              Komunitas Regional Independen
            </option>
            <option value="community_general">Komunitas Umum/Karya</option>
            <option value="shop">Entitas Usaha Bisnis/Toko</option>
            <option value="idol">Virtual Idol</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="register__orgDescription">Deskripsi</Label>
          <Input
            required
            type="textarea"
            id="register__orgDescription"
            onChange={createHandleValue('orgDescription')}
          />
          <FormText color="muted">
            Silakan isi dengan penjelasan mengenai aktivitas organisasi Anda.
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="register__orgEmail">Email</Label>
          <Input
            type="email"
            id="register__orgEmail"
            onChange={createHandleValue(
              'orgEmail',
              e => e.target.value || null
            )}
          />
          <FormText color="muted">
            Kami akan menggunakan alamat email ini untuk keperluan bersurat jika
            diperlukan.
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="register__orgLogo">Gambar logo</Label>
          <Input
            required
            type="file"
            accept="image/png"
            id="register__orgLogo"
            onChange={createHandleValue('orgLogo', e => e.target.files[0])}
          />
          <FormText color="muted">
            Gambar harus berupa file PNG dengan ukuran maksimal 500 KB.
          </FormText>
          <ImageFilePreview
            file={formValues.orgLogo}
            className="RegisterForm_imagePreview mt-2"
          />
        </FormGroup>
        <FormGroup>
          <Label for="register__orgLocation">Domisili</Label>
          <Input
            required
            type="text"
            id="register__orgLocation"
            onChange={createHandleValue('orgLocation')}
          />
          <FormText color="muted">
            Silakan isi dengan nama kota/daerah organisasi Anda aktif (contoh:
            Jakarta, Bandung, Malang).
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="register__orgWebsite">Website (opsional)</Label>
          <Input
            type="url"
            id="register__orgWebsite"
            onChange={createHandleValue('orgWebsite')}
          />
        </FormGroup>
        <FormGroup>
          <h3>Akun media sosial</h3>
          <p>
            Salah satu dari alamat akun media sosial organisasi di bawah ini
            harus diisi.
          </p>
          <FormGroup>
            <Label for="register__orgFacebook">Facebook</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>https://www.facebook.com/</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                id="register__orgFacebook"
                onChange={createHandleValue('orgFacebook')}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="register__orgTwitter">Twitter</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>https://www.twitter.com/</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                id="register__orgTwitter"
                onChange={createHandleValue('orgTwitter')}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="register__orgInstagram">Instagram</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>https://www.instagram.com/</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                id="register__orgInstagram"
                onChange={createHandleValue('orgInstagram')}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="register__orgYoutube">YouTube</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>https://www.youtube.com/</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                id="register__orgYoutube"
                onChange={createHandleValue('orgYoutube')}
              />
            </InputGroup>
          </FormGroup>
        </FormGroup>
      </div>

      <div className="my-5">
        <h2>Maskot</h2>
        <FormGroup>
          <Label for="register__mascotName">Nama maskot</Label>
          <Input
            required
            type="text"
            id="register__mascotName"
            onChange={createHandleValue('mascotName')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="register__mascotImage">Gambar maskot</Label>
          <Input
            required
            type="file"
            accept="image/png"
            id="register__mascotImage"
            onChange={createHandleValue('mascotImage', e => e.target.files[0])}
          />
          <FormText color="muted">
            Gambar harus berupa file PNG dengan ukuran maksimal 1 MB.
          </FormText>
          <ImageFilePreview
            file={formValues.mascotImage}
            className="RegisterForm_imagePreview mt-2"
          />
        </FormGroup>
        <FormGroup>
          <Label for="register__mascotDescription">Deskripsi</Label>
          <Input
            required
            type="textarea"
            id="register__mascotDescription"
            onChange={createHandleValue('mascotDescription')}
          />
          <FormText color="muted">
            Silakan isi dengan penjelasan mengenai maskot Anda (biodata, hobi,
            favorit, dll.).
          </FormText>
        </FormGroup>
      </div>

      <div className="my-5">
        <h2>Perwakilan</h2>
        <p>
          Setiap organisasi wajib memberikan satu perwakilan yang akan kami
          kontak ketika dibutuhkan.
        </p>
        <FormGroup>
          <Label for="register__picName">Nama</Label>
          <Input
            required
            type="text"
            id="register__picName"
            onChange={createHandleValue('picName')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="register__picFacebook">Akun Facebook</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>https://www.facebook.com/</InputGroupText>
            </InputGroupAddon>
            <Input
              required
              type="text"
              id="register__picFacebook"
              onChange={createHandleValue('picFacebook')}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="register__picEmail">Email (opsional)</Label>
          <Input
            type="email"
            id="register__picEmail"
            onChange={createHandleValue(
              'picEmail',
              e => e.target.value || null
            )}
          />
        </FormGroup>
      </div>

      <div className="my-5">
        <FormGroup>
          <ReCAPTCHA
            sitekey={process.env.RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
          />
        </FormGroup>
      </div>

      <Button block type="submit">
        Kirim
      </Button>
    </Form>
  )
}

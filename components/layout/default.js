import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../navbar'
import Footer from '../Footer'

export default function DefaultLayout({children}) {
  return (
    <>
      <Navbar/>
      {children}
      <Footer/>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node
}

DefaultLayout.defaultProps = {
  children: null
}

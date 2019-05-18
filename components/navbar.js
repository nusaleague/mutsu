import React from 'react'
import Link from 'next/link'
import Navbar from 'reactstrap/lib/Navbar'
import NavbarBrand from 'reactstrap/lib/NavbarBrand'

export default class Example extends React.Component {
  render() {
    return (
      <Navbar dark color="dark">
        <Link passHref href="/">
          <NavbarBrand>Nusa League</NavbarBrand>
        </Link>
      </Navbar>
    )
  }
}

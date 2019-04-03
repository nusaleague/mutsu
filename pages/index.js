import React from 'react'
import Link from 'next/link'

export default () => (
  <>
    <ul>
      <li>
        <Link href="/vote?fixture=uwu"><a>Not found</a></Link>
      </li>
      <li>
        <Link href="/vote?fixture=nusaimoe-2019test-w1-28db75fb"><a>Active</a></Link>
      </li>
      <li>
        <Link href="/vote?fixture=nusaimoe-2019test-w2-0d41939a"><a>Expired</a></Link>
      </li>
      <li>
        <Link href="/vote?fixture=nusaimoe-2019test-w3-792ecf5e"><a>Not yet</a></Link>
      </li>
    </ul>
  </>
)

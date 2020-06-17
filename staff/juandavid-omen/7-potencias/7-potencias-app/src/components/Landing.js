import React from 'react'
import './Landing'

import { Link } from 'react-router-dom'

export default function () {
  return (
    <section className='landing'>
      <Link to='/register'>Register</Link> | <Link to='/login'>Login</Link>
    </section>
  )
}

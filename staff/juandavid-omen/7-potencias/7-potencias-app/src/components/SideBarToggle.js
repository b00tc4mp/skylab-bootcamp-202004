import React from 'react'

export default function ({ toggleSideBar }) {
  const sideBarToggleHandler = event => {
    event.preventDefault()

    toggleSideBar()
  }

  return (

    <div className='toggle-button' onClick={sideBarToggleHandler} />
  )
}

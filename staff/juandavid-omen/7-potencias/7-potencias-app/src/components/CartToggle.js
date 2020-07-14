import React from 'react'
import './CartToggle.sass'

export default function ({ toggleHiddenDropdown, reference }) {
  const cartDrowpdownToggleHandler = event => {
    event.preventDefault()

    toggleHiddenDropdown()
  }

  return (

    <div className='shopping_cart' ref={reference} onClick={cartDrowpdownToggleHandler} />
  )
}

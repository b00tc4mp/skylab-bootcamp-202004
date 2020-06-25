import React from 'react'
import './CartToggle.sass'

export default function ({ toggleHiddenDropdown }) {
  const cartDrowpdownToggleHandler = event => {
    event.preventDefault()

    toggleHiddenDropdown()
  }

  return (

    <div className='shopping_cart' onClick={cartDrowpdownToggleHandler} />
  )
}

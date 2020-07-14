import React from 'react'

export default function ({ clearCart }) {
  const handleRemoveCart = event => {
    event.preventDefault()

    clearCart()
  }

  return (
    <button className='clear-cart' onClick={handleRemoveCart}>Clear Cart</button>
  )
}

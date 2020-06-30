import React from 'react'

export default function ({ clearCart }) {
  const handleRemoveCart = event => {
    event.preventDefault()

    clearCart()
  }

  return (
    <button onClick={handleRemoveCart}>Clear Cart</button>
  )
}

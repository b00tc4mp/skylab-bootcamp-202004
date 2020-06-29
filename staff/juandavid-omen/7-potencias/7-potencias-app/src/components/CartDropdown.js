import React, { useEffect, useState } from 'react'
import './CartDropdown.sass'
import { retrieveCart } from '7-potencias-client-logic'

export default function ({ reference, cart, toggleHidden }) {
  const handleGoToCheckOut = event => {
    event.preventDefault()

    toggleHidden()
  }

  // useEffect(async () => {
  //   debugger
  //   const result = await retrieveCart(token)
  //   console.log(result)
  //   // cart && setCart(cart)
  // }, [])

  return (
    <section className='cart-dropdown' ref={reference}>
      <div className='cart-items'>
        {cart && cart.length ? (cart.map(item => (<>
          <p>{item.product.name}</p>
          <p>$ {item.product.price}</p>
          <span>{item.quantity}</span>
        </>))
        )
          : (<span className='empty-message'>Your cart is empty</span>)}
      </div>
      <div className='button-items'>
        <button onClick={handleGoToCheckOut}>Go to Check Out</button>
        <button onClick={handleGoToCheckOut}>Clear Cart</button>
      </div>

    </section>
  )
}

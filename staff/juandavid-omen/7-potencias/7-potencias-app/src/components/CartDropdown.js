import React from 'react'
import './CartDropdown.sass'

export default function ({ cart, toggleHidden, reference }) {
  const handleGoToCheckOut = event => {
    event.preventDefault()

    toggleHidden()
  }
  return (
    <section className='cart-dropdown' ref={reference}>
      <div className='cart-items'>
        {cart && cart.length ? (cart.map(item => (<>
          <p>{item.name}</p>
          <p>$ {item.price}</p>
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

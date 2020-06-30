import React, { useEffect } from 'react'
import './CartDropdown.sass'
import RemoveCart from './RemoveCart'

export default function ({ reference, cart, toggleHidden, removeCart }) {
  useEffect(() => {
  }, [cart])

  const handleGoToCheckOut = event => {
    event.preventDefault()

    toggleHidden()
  }
  return (
    <section className='cart-dropdown' ref={reference}>
      <div className='cart-items'>
        {cart && cart.length ? (cart.map(item => (<>
          <div className="cart-items__item">
            <p className="cart-items__title">{item.product.name}</p>
            <div className="cart-items__amount">
              <span>${item.product.price}</span>
              <span>x</span>
              <span>{item.quantity}</span>
            </div>
            <div className="cart-items__total">
              <span>$</span>
              <span>{item.product.price * item.quantity}</span>
            </div>
          </div>
        </>))
        )
          : (<span className='empty-message'>Your cart is empty</span>)}
      </div>
      <div className='button-items'>
        <button onClick={handleGoToCheckOut}>Go to Check Out</button>
        <RemoveCart clearCart={removeCart} />
      </div>

    </section>
  )
}

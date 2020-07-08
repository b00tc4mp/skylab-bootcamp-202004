import React from 'react'
import RemoveCart from './RemoveCart'
import CartItems from './CartItems'
import { Link } from 'react-router-dom'
import './Checkout.sass'

export default function ({ cart, removeCart, checkout }) {
  const handleCheckout = event => {
    event.preventDefault()

    checkout()
  }

  return (
    <section className='checkout'>
      <header className='checkout__header'>
        <strong>Items in Your Cart</strong>
      </header>
      <div className='checkout__divider' />
      <div className='cart-block'>
        <CartItems cart={cart} />
      </div>
      <div className='checkout__button-items'>
        <div className='checkout__extra-buttons'>
          <RemoveCart clearCart={removeCart} />
          <Link className='continue-btn' to='/lessons'>Continue Shopping</Link>
        </div>
        <Link className='checkout__btn' onClick={handleCheckout} to='/order'>Check Out</Link>
      </div>

    </section>
  )
}

import React from 'react'
import './CartDropdown.sass'
import RemoveCart from './RemoveCart'
import CartItems from './CartItems'
import { Link } from 'react-router-dom'

export default function ({ reference, cart, removeCart }) {
  return (
    <section className='cart-dropdown' ref={reference}>
      <CartItems cart={cart} />
      <div className='button-items'>
        {
          cart.length === 0
            ? <Link className='disabled-cursor checkout-button' to='/' onClick={(event) => event.preventDefault()}>Go to Check Out</Link>
            : <Link className='checkout-button' to='/checkout'>Go to Check Out</Link>
        }
        <RemoveCart clearCart={removeCart} />
      </div>

    </section>
  )
}

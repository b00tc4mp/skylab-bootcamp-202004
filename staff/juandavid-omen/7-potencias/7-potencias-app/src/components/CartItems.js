import React from 'react'

export default function ({ cart }) {
  return (
    <div className='cart-items'>
      {cart && cart.length ? (cart.map(item => (<>
        <div className='cart-items__item'>
          <p className='cart-items__title'>{item.product.name}</p>
          <div className='cart-items__amount'>
            <span className='cart-items__qty'>{item.quantity}</span>
            <span>x</span>
            <span>${item.product.price}</span>
          </div>
          <div className='cart-items__total'>
            <span className='cart-items__price'>$</span>
            <span className='cart-items__price'>{item.product.price * item.quantity}</span>
          </div>
        </div>
      </>))
      )
        : (<span className='empty-message'>Your cart is empty</span>)}
    </div>
  )
}

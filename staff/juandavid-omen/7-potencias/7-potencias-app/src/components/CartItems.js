import React from 'react'

export default function ({ cart }) {
  const calculateTotalPrice = cart => {
    let totalItemsPrice = 0

    for (const productSelection of cart) {
      const itemPrice = productSelection.product.price * productSelection.quantity
      totalItemsPrice += itemPrice
    }
    return totalItemsPrice
  }

  return (
    <div className='cart-items'>
      <div className='cart-items__wrapper'>
        {cart && cart.length ? (cart.map(item => (<>
          <div className='cart-items__item'>
            <p className='cart-items__item-title'>{item.product.name}</p>
            <div className='cart-items__item-amount'>
              <span className='cart-items__item-qty'>{item.quantity}</span>
              <span>x</span>
              <span>${item.product.price}</span>
            </div>
            <div className='cart-items__item-total'>
              <span className='cart-items__item-price'>$</span>
              <span className='cart-items__item-price'>{item.product.price * item.quantity}</span>
            </div>
          </div>
        </>)
        ))
          : (<span className='empty-message'>Your cart is empty</span>)}
      </div>
      <div className='cart-items__total'>
        <p>Total</p><p> ${calculateTotalPrice(cart)}</p>
      </div>
    </div>
  )
}

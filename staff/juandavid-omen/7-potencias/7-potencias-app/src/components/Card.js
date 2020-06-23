import React, { useState } from 'react'
import './Products.sass'
import updateCart from '7-potencias-client-logic/update-cart'

export default function ({ product, token }) {
  const [error, setError] = useState()
  const [cart, setCart] = useState([])
  const { id, name, style, price } = product

  const handleAddToCard = event => {
    event.preventDefault()

    let quantity = 1
    const index = cart.findIndex(item => item.productId === id)

    if (index === -1) {
      cart.push({ productId: id, quantity: quantity })
    } else {
      quantity = ++cart[index].quantity
    }

    try {
      updateCart(token, id, quantity)
        .then(() => {
          setError(undefined)
          setCart(cart)
        })
        .catch(({ message }) => {
          setError(message)
        })
    } catch ({ message }) {
      setError(message)
    }
  }

  return (
    <section className='description-table'>
      <div className='description-table-cont'>
        <div className='description-table-indiv'>
          <div className='description-table-head'>
            <h2>DANCE {style}</h2>
            <h3><sup>$ </sup>{price}<sub>/Mil</sub></h3>
          </div>
          <ul className='description-table-list'>
            <li>{name}</li>
            <li>Bodily dissociation</li>
            <li>musicality</li>
            <li>Correct execution of the steps</li>
          </ul>
          <a className='description-table-button' onClick={handleAddToCard}>Add to cart</a>
        </div>
      </div>
    </section>
  )
}

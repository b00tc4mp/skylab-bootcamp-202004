import React from 'react'
import './Products.sass'
import { useAlert } from 'react-alert'

export default function ({ product, addToCart, isLoggedIn }) {
  const { id, name, style, price } = product
  const alert = useAlert()

  const handleAddToCard = event => {
    event.preventDefault()

    if (isLoggedIn()) addToCart(id, name, price)
    else alert.show('You need to LOGIN to add lessons to the cart')
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

import React, { useState } from 'react'
import './Products.sass'
import Feedback from './Feedback'
import './Feedback.sass'

export default function ({ product, addToCart }) {
  const [error, setError] = useState()
  const { id, name, style, price } = product

  const handleAddToCard = event => {
    event.preventDefault()

    addToCart(id, name, price)
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
          {error && <Feedback message={error} level='error' />}
        </div>
      </div>
    </section>
  )
}

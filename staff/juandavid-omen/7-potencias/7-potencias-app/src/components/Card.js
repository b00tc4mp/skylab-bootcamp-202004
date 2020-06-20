import React from 'react'
import './Products.sass'
import { addToCart } from '7-potencias-client-logic'

export default function ({product}) {
  const { id, name, style, price } = product

  /*try {
    addToCart(id, token)
      .then(onAddToCart)
      .catch(error => setError(error.message))
  } catch ({ message }) {
    setError(message)
  }*/

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
          <a href='#' className='description-table-button' onClick={addToCart}>Add to cart</a>
        </div>
      </div>
    </section>
  )
}

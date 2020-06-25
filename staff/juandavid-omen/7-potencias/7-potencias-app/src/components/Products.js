import React, { useState, useEffect } from 'react'
import './Products.sass'
import Card from './Card'
import { searchLessons } from '7-potencias-client-logic'

export default function ({ token, addToCart }) {
  const [error, setError] = useState()
  const [products, setProducts] = useState([])

  useEffect(() => {
    try {
      searchLessons()
        .then(products => {
          setError(undefined)
          return setProducts(products)
        })
        .catch(({ message }) => {
          setError(message)
          setProducts(undefined)
        })
    } catch ({ message }) {
      setError(message)
    }
  }, [])

  return (
    <section className='card'>
      <section className='miswitch'>
        <div className='swicht-btn' id='swicht-btn' />
        <a>Individual</a>
        <a>Group</a>
      </section>
      <section className='description-card'>
        {products && products.map(product => (<>
          <Card key={product.id} product={product} addToCart={addToCart} />
        </>))}
      </section>
    </section>
  )
}

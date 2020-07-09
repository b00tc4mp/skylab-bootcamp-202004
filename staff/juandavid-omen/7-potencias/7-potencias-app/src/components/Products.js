import React, { useState, useEffect } from 'react'
import './Products.sass'
import Card from './Card'
import { searchLessons } from '7-potencias-client-logic'
import { transitions, positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

export default function ({ addToCart, isLoggedIn }) {
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

  const options = {
    timeout: 3000,
    position: positions.BOTTOM_CENTER,
    offset: '100px',
    transition: transitions.SCALE
  }

  return (
    <section className='card'>
      <Provider template={AlertTemplate} {...options}>
        <section className='miswitch'>
          <div className='swicht-btn' id='swicht-btn' />
          <a>Individual</a>
          <a>Group</a>
        </section>
        <section className='description-card'>
          {products && products.map(product => (<>
            <Card key={product.id} product={product} addToCart={addToCart} isLoggedIn={isLoggedIn} />
          </>))}
        </section>
      </Provider>
    </section>
  )
}

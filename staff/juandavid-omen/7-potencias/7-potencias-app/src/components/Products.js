import React from 'react'
import './Products.sass'
import Card from './Card'

export default function () {
  var products = []
  products.push({
    name: 'Salsa Caleña',
    id: 12,
    price: 20,
    style: 'SALSA'
  })
  products.push({
    name: 'Bachata Dominicana',
    id: 14,
    price: 25,
    style: 'BACHATA'
  })
  products.push({
    name: 'Hip Hop',
    id: 12,
    price: 20,
    style: 'URBAN'
  })
  products.push({
    name: 'Hip Hop',
    id: 12,
    price: 20,
    style: 'URBAN'
  })
  products.push({
    name: 'Hip Hop3',
    id: 12,
    price: 20,
    style: 'URBAN'
  })
  products.push({
    name: 'Hip Hop4',
    id: 12,
    price: 20,
    style: 'URBAN'
  })
  const cards = products.map((product) => {
    return ( <Card product = {product} /> )
  })

  return (
    <section className='card'>
      <section className='miswitch'>
        <div className='swicht-btn' id='swicht-btn' />
        <a>Individual</a>
        <a>Group</a>
      </section>
      <section className='description-card'>
        { cards }
      </section>
    </section>
  )
}

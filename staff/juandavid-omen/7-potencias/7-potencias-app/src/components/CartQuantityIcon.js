import React from 'react'

export default function ({ quantity }) {
  return (
    <div className='shopping_amount'>
      <div className='amount'>{quantity}</div>
    </div>
  )
}

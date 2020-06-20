import React from 'react'
import items from './items.css'

let itemsCatalogue = ['double-bed', 'single-bed']

export default function Catalogue({onDragStart}) {

  const handleCatalogueDrag = (e) => {
    const itemId = e.dataTransfer.setData("text", e.target.id)
    onDragStart(itemId)
}
  return (
    <div className='items'>
      {itemsCatalogue.map((item, i) => (
        <div
          className={item}
          draggable={true}
          onDragStart={handleCatalogueDrag}
          id={`${item}_${i}`}
        />
      ))}
    </div>
  )
}

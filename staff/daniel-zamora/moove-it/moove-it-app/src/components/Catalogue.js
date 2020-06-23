import React from 'react'
import './Catalogue.sass'

let itemsCatalogue = ['double-bed', 'single-bed']

export default function Catalogue({}) {

  const handleCatalogueDrag = (e) => {
  e.dataTransfer.setData("text", e.target.id)
  e.dataTransfer.setData("boolean", false)
}
  return (
    <div className='items'>
      {itemsCatalogue.map((item, i) => (
        <div 
          className={item}
          draggable={true}
          onDragStart={handleCatalogueDrag}
          id={`${item}`}
        />
      ))}
    </div>
  )
}

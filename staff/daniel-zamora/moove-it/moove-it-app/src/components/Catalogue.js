import React from 'react'
import './Catalogue.sass'

let itemsCatalogue = ['double-bed', 'single-bed']

export default function Catalogue() {

  const handleCatalogueDrag = (e) => {
  e.dataTransfer.setData("text", e.target.className)
  e.dataTransfer.setData("boolean", true)
}
  return (
    <div className='plane__catalogue'>
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

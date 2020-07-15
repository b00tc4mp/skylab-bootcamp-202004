import React from 'react'
import './Catalogue.sass'

// let itemsCatalogue = [ 
//   {name:'double-bed', url: '../images/double-bed.png'}, 
//   {name: 'single-bed', url: '../images/single-bed.png'}
// ]

let itemsCatalogue = ['double-bed', 'deskt', 'couch', 'dresser', 'tv']

export default function Catalogue() {

  const handleCatalogueDrag = (e) => {
  e.dataTransfer.setData("text", e.target.className)
  e.dataTransfer.setData("boolean", true)
}
  return (
    <div className='plane__catalogue'>
      {/* {Object.keys(itemsCatalogue).map((item, i) => { */}
      {itemsCatalogue.map((item, i) => {
        return <div 
          key={item}
          className={`${item} catalogue`}
          draggable={true}
          onDragStart={handleCatalogueDrag}/>
            {/* <img src={itemsCatalogue.url}/></div> */}
          })}
    </div>
  )
}

import React, { useState } from 'react'
import './PlaneBuilder.css'
import './items.css'
// const background = require('../images/blueprint-background.jpg')

const items = [
    'double-bed',
    'single-bed'
]
export default function PlaneBuilder () { 

    const [placedItems, setPlacedItems] = useState([])

    const handleDrag = (e) => {
        e.dataTransfer.setData("text", e.target.id)
    }
    
    //let item
    const handleDrop = (e) => { debugger
        e.preventDefault()
        let item = e.dataTransfer.getData("text")
        if(placedItems.find(element => element.item === item)){
        updateItem(item, e.clientX, e.clientY)
        } else {    
            placeItem(item, e.clientX, e.clientY)
        }
     }
    
    const updateItem = (item, x, y) => {
        const updated = placedItems.filter(element=>element.item !== item)
        debugger
        setPlacedItems([...updated, {item, x, y}])
    }
 
    const handleDragOver = (e) => {
        e.preventDefault()
    }
    
    const placeItem = (item, x, y)=> { debugger
        setPlacedItems(prevPlacedItems =>  ([...prevPlacedItems, {item, x, y}])
        )}

    return (
        <div className="map-builder">
            <div className="map" 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            >
            {placedItems.map((placed, i) => { debugger
                
                return <div
                    data-placed = {true}
                    className={`placed ${placed.item.split('_')[0]}`} 
                    style={{left: placed.x, top: placed.y}}
                    draggable={true}
                    onDragStart={handleDrag}
                    id={`${placed.item}`}>
                    

            </div>})}
        </div>
        {/* <CatalogView props={catalogue}/>  separar el catalogo */}
            <div className="items">{
                items.map((item, i) => (
                    <div className={item} 
                    draggable={true}
                    onDragStart={handleDrag}
                    id={`${item}_${i}`}/>))}
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import './PlaneBuilder.css'
import './items.css'
// const background = require('../images/blueprint-background.jpg')

const items = [
    'double-bed',
    'single-bed'
]
export default function PlaneBuilder () { debugger

    const [placedItems, setPlacedItems] = useState([])

    const handleDrag = (e) => {
        e.dataTransfer.setData("text", e.target.id); 
    }
    
    let item
    const handleDrop = (e) => {
        e.preventDefault()
        item = e.dataTransfer.getData("text").split("_")[0]
        if(!e.target.dataset.placed) {
            placeItem(item, e.clientX, e.clientY)
        } else {
            updateItem(item, e.clientX, e.clientY)
        }
    }

    const updateItem = (item, x, y) => {
        
        setPlacedItems([{item, x, y}])
    }
    
    const placeItem = (item, x, y)=> {
        setPlacedItems(prevPlacedItems =>  ([...prevPlacedItems, {item, x, y}])
        )}

    return (
        <div className="map-builder">
            <div className="map" 
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            >
            {placedItems.map((placed, i) => {
                if(placed.item !== item)
                return <div
                    data-placed = {true}
                    className={`placed ${placed.item}`} 
                    style={{left: placed.x, top:placed.y}}
                    draggable={true}
                    onDragStart={handleDrag}
                    id={`${placed.item}_${i}`}>

            </div>})}
        </div>
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
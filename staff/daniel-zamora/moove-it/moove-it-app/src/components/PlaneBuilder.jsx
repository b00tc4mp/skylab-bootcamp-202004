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
        e.dataTransfer.setData("text", e.target.id); 
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const item = e.dataTransfer.getData("text").split("_")[0]
        placeItem(item, e.clientX, e.clientY)
    }

    const placeItem = (item, x, y)=> {
        setPlacedItems(prevState => [...prevState, {item, x, y}])
    // console.dir({item, x, y})
    }

    return (
        <div className="map-builder">
            <div className="map" 
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
        >
            {placedItems.map(placed => {
            return <div className={`placed ${placed.item}`} 
                    style={{left: placed.x, top:placed.y}}>

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
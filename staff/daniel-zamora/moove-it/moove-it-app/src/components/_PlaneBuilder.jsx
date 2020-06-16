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

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', e.target.id); 
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const item = e.dataTransfer.getData('text').split("_")[0]
        placeItem(item, e.clientX, e.clientY)
    }

    const placeItem = (item, x, y)=> {
        setPlacedItems(prevState => [...prevState, {item, x, y}])
    console.dir({
        item, x, y
    })
    }

    return (<div className='plane-builder' /*style={{backgroundColor: '#CFD0D3'}}*/>
            <div 
            className="plane"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            >
            {placedItems.map(placed => (
            <div className={`placed ${placed.item}`} //map
                style={{
                    left: placed.x, 
                    top: placed.y}}>
            </div>))}
            
            <div className='items'> 
                {items.map((item, i) => (
                    <div className={`item ${item}`} 
                    draggable={true}
                    id={`${item}_${i}`}
                    onDragStart={handleDragStart}
                    ></div>
                    ))}
            </div>
        </div>
        </div>
    );
}
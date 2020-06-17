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
    const handleDrop = (e) => { debugger
        e.preventDefault()
        item = e.dataTransfer.getData("text").split('_')[0]
        if(!e.target.dataset.placed) {
            placeItem(item, e.clientX, e.clientY)
        } else {
            updateItem(item, e.clientX, e.clientY)
        }
    }
    // TODO hacer una copia del objeto y sacar el anterior y meter el nuevo con las nuevas cordenadas
    const updateItem = (item, x, y) => { debugger
        const foundItem = placedItems.find(item)
        if(foundItem === item)
        setPlacedItems([x, y])
    }
    
    const placeItem = (item, x, y)=> { debugger
        setPlacedItems(prevPlacedItems =>  ([...prevPlacedItems, {item, x, y}])
        )}

    return (
        <div className="map-builder">
            <div className="map" 
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            >
            {placedItems.map((placed, i) => { debugger
                
                return <div
                    data-placed = {true}
                    className={`placed ${placed.item}`} 
                    style={{left: placed.x, top: placed.y}}
                    draggable={true}
                    onDragStart={handleDrag}
                    id={`${placed.item}`}>
                    {/* TODO ver como mantener el ID sin cambiar la clase  */}

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
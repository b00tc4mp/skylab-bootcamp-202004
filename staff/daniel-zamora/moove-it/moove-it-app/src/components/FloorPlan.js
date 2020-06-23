import React, { useState } from 'react'
import './FloorPlan.sass'
import Catalogue from './Catalogue'
import  './Catalogue.sass'
// import { v4 as uuidv4 } from 'uuid';

 
export default function PlaneBuilder({blueprint}) {

    const [placedItems, setPlacedItems] = useState([])
    const [actualBlueprint, setActualBlueprint] = useState()

    
    const handleOnDrop = (e) => { debugger
        const isPlaced = e.dataTransfer.getData('boolean')
        const catalogueItemId = e.dataTransfer.getData("text")
        let x = e.clientX
        let y = e.clientY
        if(isPlaced) {
        return setPlacedItems(prevPlacedItems => ([...prevPlacedItems, {catalogueItemId, x, y, id: Date.now(), isPlaced: true}]))
        // blueprint.items.push(newItem)
        // setActualBlueprint(blueprint.items)
        }
        else {
            console.log(e.id)
            const planeId = e.id
            const updated = placedItems.filter(element => element.id !== planeId)
            return setPlacedItems([...updated, { catalogueItemId, x, y, isPlaced: true}])
        }
    }

    const handlePlaneDrag = (e) => {
        const itemId = e.dataTransfer.setData("text", e.target.id)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }
   

    return ( <section className="plane">
        <h2 className="plane__title">Create your blueprint</h2>
        <div className = "plane__container" >
            <div className = "plane__grid"
            onDragOver = { handleDragOver }
            onDrag = {handlePlaneDrag}
            onDrop = { handleOnDrop } > 
            {placedItems && placedItems.map((placed, i) => { debugger
                    console.log(placed)
                    return <div key={placed.id}
                    className = {`placed ${(placed.catalogueItemId)}` }
                    style = {{ left: placed.x, top: placed.y }}
                    draggable = { true }
                    onDragStart = { handlePlaneDrag } 
                    id={placed.id}>
                    </div>})} 
        </div>
      <Catalogue/>  
      </div> 

    </section>)
}
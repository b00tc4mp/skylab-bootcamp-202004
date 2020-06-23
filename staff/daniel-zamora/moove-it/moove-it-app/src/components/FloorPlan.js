import React, { useState } from 'react'
import './FloorPlan.sass'
import Catalogue from './Catalogue'
import  './Catalogue.sass';

 
export default function PlaneBuilder({blueprint}) {

    const [placedItems, setPlacedItems] = useState(sessionStorage.blueprints? JSON.parse(sessionStorage.blueprints): [])

    
    const handleOnDrop = (e) => { 
        let x = e.clientX
        let y = e.clientY
        const _id = e.dataTransfer.getData("text")

        if(e.dataTransfer.getData('boolean') === '') {
            const planeId = e.id
            const updated = placedItems.map((element, i) => {
            if(element.id == _id){
                element.x = x
                element.y = y
            }
                   
            return element
                
            })
            setPlacedItems([...updated])
            sessionStorage.blueprints = JSON.stringify([...updated])

        }
        else {
            const catalogueItemId = e.dataTransfer.getData("text")
            setPlacedItems(prevPlacedItems => ([...prevPlacedItems, {catalogueItemId, x, y, id: Date.now(), }]))
            sessionStorage.blueprints = JSON.stringify([...placedItems, {catalogueItemId, x, y, id: Date.now(), }])
            return e.dataTransfer.setData("text", e.target.id)
            
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
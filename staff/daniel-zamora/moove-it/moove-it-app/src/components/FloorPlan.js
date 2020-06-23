import React, { useState, Component } from 'react'
import './FloorPlan.sass'
import Catalogue from './Catalogue'
import  './Catalogue.sass'
import { v4 as uuidv4 } from 'uuid';

 
export default function PlaneBuilder({blueprint}) {

    const [placedItems, setPlacedItems] = useState([])
    const [actualBlueprint, setActualBlueprint] = useState()
    
    // const handleCatalogueDrag = (e) => {
    //     const catalogueItemId = e.dataTransfer.getData("catalogueId")
    // }

    const handlePlaneDrag = (e) => {
        const itemId = e.dataTransfer.setData("text", e.target.id)
    }
    
    const handleCatalogueDragEnd = (e) => { debugger
        const catalogueItemId = e.dataTransfer.getData("text")
        let x = e.clientX
        let y = e.clientY
        let newItem = {catalogueItemId, x, y, id: uuidv4()}
        // blueprint.items.push(newItem)
        // setPlacedItems(blueprint.items)
        setPlacedItems(catalogueItemId)
    }
    // const handleDrop = (e) => {
    //     e.preventDefault()
    //     let item = e.dataTransfer.getData('text')
    //     // let newItem = {id: uuidv4(), cataloge_id: }
    //     if (placedItems.find(element => element.item === item)) {
    //         updateItem(item, e.clientX, e.clientY)
    //     } else {
    //         placeItem(item, e.clientX, e.clientY)
    //     }
    // }


    // const updateItem = (item, x, y) => {
    //     const updated = placedItems.filter(element => element.item !== item)
    //     setPlacedItems([...updated, { item, x, y }])
    // }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    // const placeItem = (item, x, y) => {
    //     setPlacedItems(prevPlacedItems => ([...prevPlacedItems, { item, x, y }]))
    // }

    return ( <section className="plane">
        <h2 className="plane__title">Create your blueprint</h2>
        <div className = "plane__container" >
            <div className = "plane__grid"
            onDragOver = { handleDragOver }
            onDrag = {handlePlaneDrag}
            onDrop = { handleCatalogueDragEnd } > 
            {/* {blueprint.items.map((placed, i) => { */}
            {[1,2,3].map((placed, i) => {
                    console.log(placed)
                    return <div key={placed.id} data-placed = { true }
                    className = {`placed ${(placed.catalogueItemId)}` }
                    style = {{ left: placed.x, top: placed.y }}
                    draggable = { true }
                    onDragStart = { handlePlaneDrag }
                    id = { `${placed.catalogueItemId}_${i}` } >
                    </div>})} 
        </div>
      <Catalogue/>  
      </div> 

    </section>)
}
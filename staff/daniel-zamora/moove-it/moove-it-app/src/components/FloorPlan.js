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
        e.dataTransfer.setData("boolean", true)

        let objectId = e.target.id
        let item = blueprint.getItem(id)
        e.dataTransfer.setData("object", item)
    }
    
    const handleCatalogueDragEnd = (e) => { debugger
        let isAlreadyInFloorPlan = e.dataTransfer.getData("boolean")
        if(isAlreadyInFloorPlan) {
            const object = e.dataTransfer.getData("object")
            //TODO We need a call to the blueprint to UPDATE an existing object
        }
        else {
            let x = e.clientX // map between canvas X and Y positions and real measuraments
            let y = e.clientY
            let newItem = {catalogueItemId, x, y, id: uuidv4()}
            blueprint.items.push(newItem)
            setPlacedItems(blueprint.items)
        }
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
        <div className = "plane__container" >
            <div className = "plane__grid"
            onDragOver = { handleDragOver }
            onDrag = {handlePlaneDrag}
            onDrop = { handleCatalogueDragEnd } > 
            {blueprint.items.map((placed, i) => {
                    console.log(placed)
                     
                    
                    return <div key={placed.id} data-placed = { true }
                    className = {`placed ${(placed.catalogueItemId).split('_')[0]}` }
                    style = {{ left: placed.x, top: placed.y }}
                    draggable = { true }
                    onDragStart = { handlePlaneDrag }
                    id = { `${placed.catalogueItemId}_${i}` } >
                    </div>})} 
        </div>
      </div> 
      <Catalogue className='catalogue' />  
    </section>)
}
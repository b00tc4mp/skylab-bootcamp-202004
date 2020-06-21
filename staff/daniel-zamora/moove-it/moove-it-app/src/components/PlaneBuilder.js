import React, { useState } from 'react'
import './PlaneBuilder.sass'
import Catalogue from './Catalogue'
import  './Catalogue.sass'

export default function PlaneBuilder({itemId}) {

    const [placedItems, setPlacedItems] = useState([])

    const handleCatalogueDrag = (e) => {
        const catalogueItemId = e.dataTransfer.getData("text", e.target.id)
    }

    const handlePlaneDrag = (e) => {
        const planeItemId = e.dataTransfer.getData("text", e.target.id)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        let item = e.dataTransfer.getData("text")
        if (placedItems.find(element => element.item === item)) {
            updateItem(item, e.clientX, e.clientY)
        } else {
            placeItem(item, e.clientX, e.clientY)
        }
    }

    const updateItem = (item, x, y) => {
        const updated = placedItems.filter(element => element.item !== item)
        setPlacedItems([...updated, { item, x, y }])
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const placeItem = (item, x, y) => {
        debugger
        setPlacedItems(prevPlacedItems => ([...prevPlacedItems, { item, x, y }]))
    }

    return ( <secction className="plane">
        <div className = "plane__container" >
            <div className = "plane__grid"
            onDragOver = { handleDragOver }
            onDrop = { handleDrop } > {
                placedItems.map((placed, i) => {
                    return <div data-placed = { true }
                    className = {`placed ${(placed.item).split('_')[0]}` }
                    style = {{ left: placed.x, top: placed.y }}
                    draggable = { true }
                    onDragStart = { handlePlaneDrag }
                    id = { `${placed.item}` } >
                    </div>})} 
        </div>
      </div> 
      <Catalogue className='catalogue' onDragStart={handleCatalogueDrag}/>  
    </secction>)
}
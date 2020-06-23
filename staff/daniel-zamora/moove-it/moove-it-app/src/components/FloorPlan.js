import React, { useState } from 'react'
import './FloorPlan.sass'
import Catalogue from './Catalogue'
import './Catalogue.sass';
import { saveBlueprint } from 'moove-it-client-logic'


export default function PlaneBuilder({ blueprint }) {

    const [error, setError] = useState()
    const [placedItems, setPlacedItems] = useState(sessionStorage.items ? JSON.parse(sessionStorage.items) : [])

    let name, width, height, blueprintId;

    const handleOnDrop = (e) => {
        let x = e.clientX
        let y = e.clientY
        const _id = e.dataTransfer.getData("text")

        if (e.dataTransfer.getData('boolean') === '') {
            const planeId = e.id
            const updated = placedItems.map((element, i) => {
                if (element.id == _id) {
                    element.x = x
                    element.y = y
                }

                return element

            })
            setPlacedItems([...updated])
            sessionStorage.items = JSON.stringify([...updated])

        }
        else {
            const catalogueItemId = e.dataTransfer.getData("text")
            setPlacedItems(prevPlacedItems => ([...prevPlacedItems, { catalogueItemId, x, y, id: Date.now(), }]))
            sessionStorage.items = JSON.stringify([...placedItems, { catalogueItemId, x, y, id: Date.now(), }])
            return e.dataTransfer.setData("text", e.target.id)

        }
    }


    const handlePlaneDrag = (e) => {
        e.dataTransfer.setData("text", e.target.id)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleSaveBlueprint = (e) => {
        e.preventDefault()
        try {
            saveBlueprint(blueprint, name, width, height)
                .then(() => {})
                .catch(error)
        } catch ({ message }) {
            setError(message)
        }


    }

    const handleClearBlueprint = (e) => {
        e.preventDefault()
        delete sessionStorage.items
        setPlacedItems([])
    }
    // TODO function to clear the session storage

    return (<section className="plane">
        <h2 className="plane__title">Create your blueprint</h2>
        <div className="plane__container" >
            <div className="plane__grid"
                onDragOver={handleDragOver}
                onDrag={handlePlaneDrag}
                onDrop={handleOnDrop} >
                {placedItems && placedItems.map((placed, i) => {

                    return <div key={placed.id}
                        className={`placed ${(placed.catalogueItemId)}`}
                        style={{ left: placed.x, top: placed.y }}
                        draggable={true}
                        onDragStart={handlePlaneDrag}
                        id={placed.id}>
                    </div>
                })}
            </div>
            <Catalogue />
        </div>
        <form className='plane__form'>
            <button className='plane__button' onClick={handleSaveBlueprint}>Save</button>
            <button className='plane__button' onClick={handleClearBlueprint}>Clear</button>
        </form>
    </section>)
}
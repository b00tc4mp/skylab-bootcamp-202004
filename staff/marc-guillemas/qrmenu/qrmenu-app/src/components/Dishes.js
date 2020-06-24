import React, {useEffect, useState} from 'react'
import {retrieveDishes} from 'qrmenu-client-logic'
import './Dishes.sass'
import Total from './Total'

export default function({history}) {

    const [dishes, setDishes] = useState()
    const [addDish, setAddDish] = useState([]) 
    const [active, setActive] = useState(false)

    useEffect(() => {
        const [,,establishmentId,,tableId] = history.location.pathname.split('/')
        return retrieveDishes(establishmentId, tableId)
        .then(_dishes =>{
            return setDishes(_dishes)})
    },[])

    const onSubstract = id => {
        const index = addDish.findIndex(item => item._id === id);
        if(index > -1) {
            addDish.splice(index, 1)
            const newArr = addDish
            setAddDish(newArr)
        }
        
        
    }

    const toggleBack = () => {
        setActive(!active)
    }


    const handleActive = ()=>{
        
        setActive(!active)
    }

    const deleteOrder = () => {
        setAddDish([])
    }

    return  <section className="dishes">
        <section className="dishes__establishment">
            Establishment
        </section>
           
    {
        dishes? <ul className="dishes__list">
            { 
                dishes && dishes.map(({name, price, _id}) => {
                    return <li className="dishes__item">
                        <a href="" className="dishes__left">
                        <h2 className="dishes__dish">{`${name}`}</h2>
                        </a>
                        <div className="dishes__right">
                        <div className="dishes__price">{`${price}€`}</div>
                            <div className="dishes__toggle">
                                <div className="dishes__substract" onClick={() => onSubstract(_id)}>_</div>
                                <div className="dishes__add" onClick={() => {
                                    setAddDish([...addDish, {name, price, _id}])
                                    }}>+</div>
                            </div>
                        </div>
                    </li>
                })
            } 
            
            </ul> : null
    }
    <button className="dishes__button" onClick={handleActive}>
            +
    </button>

    <Total history={history} addDish={addDish} active={active} toggleBack={toggleBack} deleteOrder={deleteOrder}/> 
    
</section>
}

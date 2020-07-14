import React, { useState } from 'react'
import './Total.sass'
import {addDishesToOrder} from 'qrmenu-client-logic'


export default function({history, addDish, active, toggleBack, deleteOrder}) {
    const [error, setError] = useState()
    const onSendOrder = () => {
        let arr = addDish.map(item => {
            return item._id
        })
        const [,,establishmentId,,tableId] = history.location.pathname.split('/')

        try {
            
            addDishesToOrder(establishmentId, tableId, arr)
            .then(() => deleteOrder())
            
        } catch (error) {
            setError(error.message)
        }
    
        
    }

    
    return <section class={active ? "total total--active" : "total"}>
        <div class="total__all">
            <div class="total__header">
                <div class="total__back" onClick={()=> toggleBack()}></div>
                {/* <h2 class="total__order">Order</h2> */}
            </div>
            <div class="total__list">
            
            { 
                addDish ?  <ul class="total__dishes">
                {    
                    addDish && addDish.map(({name, price})=> {
                        return <li class='total__item'>
                            <div class="total__dish">
                                {`${name}`}
                            </div>
                            <div class="total__price">
                                {`${price} €`}
                            </div>
                        </li>  
                    })
                }
                </ul> : null
            }
            </div>
            <div class="total__info">
                <div class="total__amount">{`${addDish.reduce((acc, curr)=> acc+curr.price, 0)}€`}</div>
                <button class="total__submit" onClick={onSendOrder}>Send</button>
            </div>
        </div>
    </section>
}
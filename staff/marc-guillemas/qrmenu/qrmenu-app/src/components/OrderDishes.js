import React, {useState, useEffect} from 'react'
import './OrderDishes.sass'
import {retrieveOrderDishes} from 'qrmenu-client-logic'

export default function({dishStatus, onActive, onBack}) {
    const [orders, setOrders] = useState()
    const [dishes, setDishes] = useState([])
    
    useEffect(() => {
        
        if(dishStatus.length > 0) {
            
            retrieveOrderDishes(sessionStorage.token, dishStatus)
            .then(_dishes => {
                setDishes(_dishes)
            })
        }
    },[dishStatus.length])
 

    
    return <section class={onActive? "order-dish order-dish--active" : "order-dish"}>
        <div class="order-dish__all">
            <div class="order-dish__header">
                <div class="order-dish__back" onClick={() => onBack()}></div>
            </div>
            <div class="order-dish__list">
                {
                  dishes? <ul class="order-dish__dishes">

                    {   
                        dishes && dishes.map(dish => {
                            return (<li class='order-dish__item'>
                                <div class="order-dish__dish">
                                    {dish}
                                </div>
                            </li>)
                        })
                    }
                    
                    </ul> : null
                }
            </div>
            
        </div>
    </section>
    
}

import React, {useState, useEffect} from 'react'
import './OrderDishes.sass'
import {retrieveOrderDishes} from 'qrmenu-client-logic'

export default function({dishStatus, onActive, onBack}) {
    // const [active, setActive]
    const [orders, setOrders] = useState()
    const [dishes, setDishes] = useState([])
    // console.log(dishStatus)
    
    useEffect(() => {
        debugger
        // console.log(dishStatus)
        if(dishStatus.length > 0) {
            debugger
            retrieveOrderDishes(sessionStorage.token, dishStatus)
            .then(_dishes => {
                console.log(_dishes)
                setDishes(_dishes)
            })
        }
    },[dishStatus.length])
    // const onRetrieveDish =  (dish) => {
    //     retrieveDish(sessionStorage.token, dish)
    //     .then(console.log(dish))
    // }

    
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
            {/* <div class="order-dish__info">
                <div class="order-dish__amount">22,34€</div>
                <button class="order-dish__submit">Send</button>
            </div> */}
        </div>
    </section>
    
}

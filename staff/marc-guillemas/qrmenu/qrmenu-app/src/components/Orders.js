import React, {useState, useEffect} from 'react'
import './Orders.sass'
import {retrieveOrders} from 'qrmenu-client-logic'
import OrderDishes from './OrderDishes'

export default function() {

    const [orders, setOrders] = useState()
    const [dishStatus, setDishStatus] = useState([])
    const [active, setActive] = useState(false)

    useEffect(() => {
        retrieveOrders(sessionStorage.token)
        .then(_orders => setOrders(_orders))
    },[])

    useEffect(()=>{

    }, [dishStatus.length])

    //setTimeout(retrieveOrders(sessionStorage.token), 10000)

    const onView = _dishStatus => {
        
        setActive(!active)
        setDishStatus(_dishStatus.map(item=> item.dish))
    }

    return  <section class="orders">

        {/* <h1>hello orders</h1> */}
        {
            orders? <ul class="orders__list">
                { 
                    orders && orders.map(({table, dishStatus}) => {
                        return  <li class="orders__item">
                            <a href="" class="orders__left">
                                <div class="orders__num">
                                    <h2 class="orders__table">Table: </h2>
                                    <h1 class="orders__number">{table}</h1>
                                </div>
                            </a>
                            <div class="orders__right">
                                <div class="orders__view" onClick={()=>onView(dishStatus)}>View</div>
                            </div>
                        </li>    
                    })
                } 
                
                </ul> : console.error("Waiting...")
        }

       <OrderDishes onActive={active} dishStatus={dishStatus} onBack={()=> setActive(!active)}/>
    </section>
}
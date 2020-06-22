import React, {useState, useEffect} from 'react'
import './OrderDishes.sass'

export default function({dishStatus, onActive, onBack}) {
    // const [active, setActive]
    const [orders, setOrders] = useState()
    console.log(dishStatus)
    return <section class={onActive? "order-dish order-dish--active" : "order-dish"}>
        <div class="order-dish__all">
            <div class="order-dish__header">
                <div class="order-dish__back" onClick={() => onBack()}></div>
            </div>
            <div class="order-dish__list">
                {
                  dishStatus? <ul class="order-dish__dishes">

                    {   
                        dishStatus && dishStatus.map(({dish}) => {
                            return (<li class='order-dish__item'>
                                <div class="order-dish__dish">
                                    {dish}
                                </div>
                                {/* <div class="order-dish__price">
                                    22,22€
                                </div> */}
                            </li>)
                        })
                    }
                    
                    </ul> : console.error("Waiting...")
                }
            </div>
            {/* <div class="order-dish__info">
                <div class="order-dish__amount">22,34€</div>
                <button class="order-dish__submit">Send</button>
            </div> */}
        </div>
    </section>
    
}

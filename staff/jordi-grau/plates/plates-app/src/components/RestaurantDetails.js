import React, { useEffect, useState } from 'react'
import Dishes from './Dishes'
import {retrieveRestaurant} from 'plates-client-logic'

export default function ({currentId}){
    const [restaurant, setRestaurant] = useState()
    
   
    useEffect(()=>{
        retrieveRestaurant(currentId)
        .then(_details => {
            console.log(_details)
            setRestaurant(_details)
        })

    }, [])

    // if(!restaurant) return <div>Loading...</div>

   return <div>
              { restaurant ? <div className="restaurant_details">
            <p className="restaurant_name">{restaurant.name}</p>
            <p className="restaurant_phone">{restaurant.phone}</p>      
            <p className="restautant_email">{restaurant.email}</p>
            <p className="restaurant_address">{restaurant.address}</p>
            
        </div> : null}

         {restaurant && <Dishes dishes={restaurant.dishes}/>} 

    </div>
    
    
}
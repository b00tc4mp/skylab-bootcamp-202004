import React, { useEffect, useState } from 'react'
import Dishes from './Dishes'
import {retrieveRestaurant} from 'plates-client-logic'
import Feedback from './Feedback'

export default function ({currentId}){
    const [restaurant, setRestaurant] = useState()
    const [error, setError] = useState()
    
   
    useEffect(()=>{
        try {
            retrieveRestaurant(currentId)
            .then(_details => {
                console.log(_details)
                setRestaurant(_details)
            })
            .catch(error=> setError(error.message))
            
        } catch (error) {
            setError(error.message)
        }

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
         {error && <Feedback message={error} level="error" />}

    </div>
    
    
}
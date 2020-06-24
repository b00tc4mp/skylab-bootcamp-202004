import React, { useEffect, useState } from 'react'
import Dishes from './Dishes'
import {retrieveRestaurant} from 'plates-client-logic'
import Feedback from './Feedback'
import './RestaurantDetails.sass'

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

   return <div className="restaurant">
              { restaurant ? <div className="restaurant__one">
            <p className="restaurant__one__info">{restaurant.name}</p>
            <p className="restaurant__one__info">{restaurant.phone}</p>      
            <p className="restautant__one__info">{restaurant.email}</p>
            <p className="restaurant__one__info">{restaurant.address}</p>
            
        </div> : null}

         {restaurant && <Dishes dishes={restaurant.dishes}/>} 
         {error && <Feedback message={error} level="error" />}

    </div>
    
    
}
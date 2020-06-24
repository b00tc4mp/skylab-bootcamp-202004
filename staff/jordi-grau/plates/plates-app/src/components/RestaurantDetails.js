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
              { restaurant ? <div className="restaurant__info">
            <p className="restaurant__info__name">{restaurant.name}</p>
            <p className="restaurant__info__contact">telf.: {restaurant.phone}</p>      
            <p className="restautant__info__contact">@: {restaurant.email}</p>
            <p className="restaurant__info__contact">dir.: {restaurant.address}</p>
            
        </div> : null}

         {restaurant && <Dishes  dishes={restaurant.dishes}/>} 
         {error && <Feedback message={error} level="error" />}

    </div>
    
    
}
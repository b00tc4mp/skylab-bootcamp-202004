import React, {useState} from 'react'
import RestaurantItem from './RestaurantItem'
import Feedback from './Feedback'
import './RestaurantItem.sass'




export default function ({error, results, goToDetails}) {
    
     
    return <section >
        <ul>
            {results && results.map(restaurant =>{
                
               return <RestaurantItem key={restaurant.id} data={restaurant} onToDetails={goToDetails}/>
               
            })}
            {error && <Feedback message={error} level="error" />}
        </ul>
    </section>
        
    
 
   
}

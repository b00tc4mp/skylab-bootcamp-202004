import React, {useState} from 'react'
import RestaurantItem from './RestaurantItem'



export default function ({results, goToDetails}) {
    debugger
    return <section>
        <ul>
            {results && results.map(restaurant =>{
                
               return <RestaurantItem key={restaurant.id} data={restaurant} onToDetails={goToDetails}/>
               
            })}
        </ul>
    </section>
        
    
 
   
}

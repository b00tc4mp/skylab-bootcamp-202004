import React, {useState} from 'react'
import DishesResults from './Dishes'


export default function ({restaurants, goToDetails}) {
    return <section>
        <ul>
            {restaurants.map(restaurant =>{
                
                <RestaurantItem key={restaurant.id} data={restaurant} onToDetails={goToDetails}/>
                //return <p>{restaurant.name}</p>
            })}
        </ul>
    </section>
        
    
    // div className="restaurants">{restaurants}</div>
   
}

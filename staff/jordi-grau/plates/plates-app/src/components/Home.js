import React, {useState} from 'react'


export default function(){
    const [restaurants, setRestaurants] = useState()
    
    const handleSubmit = (restaurants, dishes)=>{
        setRestaurants(restaurants)
        // setDishes(dishes)
    }

    return <div>HOME</div>
    /* 
        <Search onSubmit={handleSubmit}>
        {restaurantes && <RestaurantResults results={restaurants}>}

    
    */
} 
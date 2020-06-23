import React, {useState} from 'react'
import RestaurantResults from './RestaurantsResults'
import DishesResults from './Dishes'
import Search from './Search'
import {retrieveRestaurant} from 'plates-client-logic'



export default function({history}){
    const [restaurants, setRestaurants] = useState()
    const [restaurant, setRestaurant] = useState()
    const [error, setError] = useState()
   
    
    const handleSubmit = (_restaurants)=>{
        setRestaurants(_restaurants)
     
        history.push('./search')
    }

    const handleGoToDetails = restaurantId =>{
        retrieveRestaurant(restaurantId)
        .then(result=> setRestaurant(result))
        .then(()=> history.push(`./details/${restaurantId}`))
        .catch(error=> setError(error))
    }

    return <div>
        <Search onSubmit={handleSubmit}/>
        <Route  path="/search" render={()=> <RestaurantResults goToDetails={handleGoToDetails} results={restaurants}/> }/>
        <Route  path="/details/:restaurantId" render={()=> <RestaurantDetails data={restaurant}/> }/>
    </div>
        
        
    
     


   // <div>Bottom NavBar</div>

    
 }
import React, {useState, useEffect} from 'react'
import RestaurantResults from './RestaurantsResults'
import RestaurantDetails from './RestaurantDetails'
import Search from './Search'
import {retrieveRestaurant, searchRestaurant} from 'plates-client-logic'
import {Route, useLocation} from 'react-router-dom'
import Navbar from './Navbar'



export default function({history}){
    const [restaurants, setRestaurants] = useState()
    const [restaurant, setRestaurant] = useState()
    const [error, setError] = useState()
    const location = useLocation()

    useEffect(()=>{
        const [,query] = location.search.split('=')
        
        if(query){
            (async()=>{
                const results = await searchRestaurant(query)
                
                setRestaurants(results)
            })()
        }
    }, [])
   
    
    const handleSubmit = (_restaurants, query)=>{
        setRestaurants(_restaurants)

        history.push(`/home/restaurants?query=${query}`)
    }

    const handleGoToDetails = (restaurantId) =>{
       // try {
           // const result = await retrieveRestaurant(restaurantId)
            
        //     setRestaurant(result)
      history.push(`/home/details/${restaurantId}`)
        // } catch (error) {
        //    console.log(error)
        // }
       
    }

    return <div>
        <Navbar/>
         {!restaurant && <Search onSubmit={handleSubmit}/>}


        <Route path="/home/restaurants" render={()=> <RestaurantResults goToDetails={handleGoToDetails} results={restaurants}/>}/>
        <Route path="/home/details/:restaurantId" render={props => <RestaurantDetails data={restaurant} currentId={props.match.params.restaurantId}/> }/>
    </div>
    
 }
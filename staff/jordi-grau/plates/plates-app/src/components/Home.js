import React, {useState, useEffect} from 'react'
import RestaurantResults from './RestaurantsResults'
import RestaurantDetails from './RestaurantDetails'
import Search from './Search'
import {retrieveRestaurant, searchRestaurant} from 'plates-client-logic'
import {Route, useLocation} from 'react-router-dom'
import Navbar from './Navbar'
import Feedback from './Feedback'
import './Home.sass'




export default function({history, onLogout}){
    const [restaurants, setRestaurants] = useState()
    const [restaurant, setRestaurant] = useState()
    const [error, setError] = useState()
    const location = useLocation()
    const [enabled, setEnabled] = useState(true)

    useEffect(()=>{
        const [,query] = location.search.split('=')
        
        if(query){
            (async()=>{
                try {
                    const results = await searchRestaurant(query)
                    
                    setRestaurants(results)
                    
                } catch (error) {
                    setError(error.message)
                }
            })()
        }
    }, [])
   
    
    const handleSubmit = (_restaurants, query)=>{
        setRestaurants(_restaurants)

        history.push(`/home/restaurants?query=${query}`)
    }

    const handleGoToDetails = (restaurantId) =>{
    
      history.push(`/home/details/${restaurantId}`)
   
    }
    
    return <div className="container">
        <header className="container__top">Search</header>
       
         {!restaurant && <Search clasName="container__search"  onSubmit={handleSubmit}/>}


        <Route path="/home/restaurants" render={()=> <RestaurantResults error={error} goToDetails={handleGoToDetails} results={restaurants}/>}/>
        <Route path="/home/details/:restaurantId" render={props => <RestaurantDetails data={restaurant} currentId={props.match.params.restaurantId}/> }/>
      
        {error && <Feedback message={error} level="error" />}
        {enabled &&  <Navbar onLogout={onLogout}/>}
    </div>
    
 }
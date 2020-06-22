import React, {useState}  from 'react'
import { searchRestaurant }  from 'plates-client-logic'

export default function Search({onSubmit, onGotoSearch}) {
    const [error, setError] = useState

    const handleSubmit = event =>{
        event.preventDefault()  

        let { query } = event
        query = query.value

        try {
            searchRestaurant(query)
            .then(restaurants=> {
                return searchDishes(query)
                .then(dishes=>onSubmit(restaurants, dishes) )
            })
            .catch(error=> setError(error.message))
        } catch (error) {
            if(error) throw error
        }
    }

}

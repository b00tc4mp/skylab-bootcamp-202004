import React, {useState}  from 'react'
import { searchRestaurant, searchDishes }  from 'plates-client-logic'
import './Search.sass'

export default function Search({onSubmit}) {
    const [error, setError] = useState()

    const handleSubmit = event =>{
        event.preventDefault()  

        let { query } = event.target
        query = query.value

        try {
          
            searchRestaurant(query)
            .then(restaurants=> onSubmit(restaurants, query))
            .catch(error=> setError(error.message))
        } catch (error) {
            if(error) throw error
        }
    }
    return<section className="search">
    <form onSubmit={handleSubmit}>
        <input type="text" name="query"/>
        <button type="submit">🔍</button>
    </form>

    
</section>

}

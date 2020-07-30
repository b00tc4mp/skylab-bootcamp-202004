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
            <form className="search__form" onSubmit={handleSubmit}>
                <input className="search__input"  type="text" name="query" placeholder="Search restaurant" />
                <button className="search__button" type="submit">🔍</button>
            </form>

    
</section>

}

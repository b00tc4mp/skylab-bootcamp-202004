import React, {useState}  from 'react'
import { searchRestaurant, searchDishes }  from 'plates-client-logic'

export default function Search({onSubmit}) {
    const [error, setError] = useState()

    const handleSubmit = event =>{
        event.preventDefault()  

        let { query } = event.target
        query = query.value

        try {
            searchRestaurant(query)
            .then(restaurants=> onSubmit(restaurants))
            .catch(error=> setError(error.message))
        } catch (error) {
            if(error) throw error
        }
    }
    return<section className="search">
    <form onSubmit={handleSubmit}>
        <input type="text" name="query"/>
        <button>🔍</button>
    </form>

       
    <button className="buttonLogout" onClick={onLogout}>Logout</button>
</section>

}

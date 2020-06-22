import React, {useState}  from 'react'
import { searchRestaurant }  from 'plates-client-logic'

export default function Search(onGotoSearch) {
    const [error, setError] = useState

    const handleSubmit = event =>{
        event.preventDefault()  

        let { query } = event
        query = query.value

        try {
            searchRestaurant
        } catch (error) {
            
        }
    }

}

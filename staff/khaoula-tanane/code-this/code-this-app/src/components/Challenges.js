import React, { useEffect, useState } from 'react'
import Challenge from './Challenge'
import { retrieveCategory, retrieveUser } from 'code-this-client-logic'


function Challenges({match: {params: {category: categoryName}}}){
    const [category, setCategory] = useState(null)
    const [user, setUser] = useState(null)
    
    useEffect(()=>{
        
        handleRetrieveCategory()

    }, [categoryName])

    useEffect(()=>{
        handleRetrieveUser()
    },[])

    const handleRetrieveUser = async () => {
        const _user = await retrieveUser()
        setUser(_user)
    }
    
    const handleRetrieveCategory = async ()=> {
        const _category = await retrieveCategory(categoryName)
        setCategory(_category)
    }

    return (
        <>
            {category && user ? (
                <div>
                    <h1>{category.name}</h1>
                    {category.challenges.map(challenge => <Challenge {...challenge} user={user}/>)}
                </div>
            ) : <p>loading challenges..</p>}
        </>
    )

}

export default Challenges
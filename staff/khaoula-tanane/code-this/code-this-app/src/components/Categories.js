import React, { useEffect, useState } from 'react'
import { retrieveCategories} from 'code-this-client-logic'
import Category from './Category'

function Categories(){
    const [categories, setCategories] = useState(null)
    useEffect(()=>{
        handleRetrieveCategories()
    }, [])

    const handleRetrieveCategories = async ()=> {
        const _categories = await retrieveCategories()
        setCategories(_categories)
    }

    return (
        <>
            {categories ? (
                <div>
                    {categories.map(category => <Category {...category}/>)}
                </div>
            ) : <p>loading..</p>}
        </>
    )

}
export default Categories
import React, { useEffect, useState } from 'react'
import { retrieveCategories, deletecategory } from 'code-this-client-logic'
import Category from './Category'


function Categories({isAdmin, handleAlert}){
    const [categories, setCategories] = useState(null)

  const handeDeleteCategory = (_id) => {
    deletecategory(_id)
    .then(() => {
      handleRetrieveCategories()
      handleAlert({
          message: 'Category deleted successfully',
          status: 'success'
      })
    })
  }

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
                <>
                    {categories.map(category => <Category key={category.name} {...category} isAdmin={isAdmin} handeDeleteCategory={handeDeleteCategory} />)}
                </>
            ) : <p>loading..</p>}
        </>
    )

}
export default Categories
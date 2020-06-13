import React, {useState, useEffect} from 'react'
import { isAuthenticated } from 'termometro-client-logic'


function EditPlan({token}) {

    const [userPlan, setUserPlan] = useState()

    useEffect(() => {
        try {
            isAuthenticated(token)
                .then(user => {
                    setUserPlan(user.plan)
                })
        } catch (error) {
            if (error) throw error
        }
    }, [])

    return (
        <section>
            <h1>EDIT PLAN</h1>
            <h2>{userPlan && userPlan}</h2>
        </section>
    )
}

export default EditPlan
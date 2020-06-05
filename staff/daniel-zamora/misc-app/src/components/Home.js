import React, { useEffect, useState } from 'react';
import retrieveUser from 'misc-logic-client/retrieve-user'
// import Feedback from './Feedback'

export default function({token}) {
    const [name, setName] = useState()

    useEffect(() => { 
        (async () => { 
            const user = await retrieveUser(token)
            setName(user.name)
        })()
    },[])

    return <section className="home"> 
        <h1>Hello, {name}</h1>
    </section>
}


import React, { useEffect, useState } from 'react';
import {retrieveUser} from 'moove-it-client-logic'

export default function({token}) {
    const [name, setName] = useState()

    useEffect(() => { 
        (async () => { 
            const user = await retrieveUser(token)
            setName(user.name)
        })()
    },[])

    return (<section className="home"> 
        <h2>Hello, {name}</h2>
    </section>)
}


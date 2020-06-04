import {React, useEffect, useState} from 'react';
import retrieveUser from 'misc-logic-client'
// import Feedback from './Feedback'

export default function({token}) {
    const [name, setName] = useState()

    async(() => {
        useEffect(() =>{ debugger
        await retrieveUser(token)
            .then(({name}) => setName(name))
        },[])
    })()

    return <>
     <section className="home">
        <h1>Hello, {name}!</h1>
    </section>
    </>
}
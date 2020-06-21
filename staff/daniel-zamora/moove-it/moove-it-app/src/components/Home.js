import React, {useState, useEffect} from 'react';
import { retrieveUser } from 'moove-it-client-logic';
import PlaneBuilder from './PlaneBuilder';

export default function Home () {
    const [name, setName] = useState()

    // useEffect(() => {
    //     try {
    //         retrieveUser()
    //             .then(user => setName(user.name))
    //     } catch(error) {
    //         throw error
    //     }
    // },[])

    return <secction className="home">
        
        

    </secction>

}
import React, {useState} from 'react'
import isAuthenticated from 'termometro-client-logic/is-authenticated'
import { Link } from 'react-router-dom'



function Settings ({token}) {

    const [user, setUser] = useState()

    try {
        isAuthenticated(token)
            .then(user => {
                setUser(user)
            })
    } catch(error) {
        if(error) throw error
    }

    return (
        <section>
            <h1>Settings</h1>
            <Link>Plan</Link>
            <Link>Mis Datos</Link>
            <Link>Cambiar Contraseña</Link>
            <Link>LogOut</Link>
        </section>
    )
}

export default Settings
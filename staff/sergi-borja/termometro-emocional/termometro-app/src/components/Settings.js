import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Settings.sass'



function Settings ({token}) {
    
    const handleLogOut = () => {
        delete sessionStorage.token
        window.location.reload()
    }

    return (
        <section className='settingsContainer'>
            <h1>Ajustes</h1>
            <br/>
            <Link className='settingsContainer__option' to='/edit-my-info'>Mis Datos</Link>
            <br/>
            <Link className='settingsContainer__option' >Cambiar Contraseña</Link>
            <br/>
            <Link to='handle-accounts'>Gestionar cuentas</Link>
            <br/>
            <button className='settingsContainer__logOut' onClick={handleLogOut}>Log out</button>
        </section>
    )
}

export default Settings
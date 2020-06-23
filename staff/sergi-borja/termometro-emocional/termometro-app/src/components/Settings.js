import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Settings.sass'

function Settings ({rol, handleLogOut}) {

    return (
        <section className='settingsContainer'>
            <div className='settingsContainer__container'>
                <h1 className='settingsContainer__title'>Ajustes</h1>
            </div>
            <div className='settingsContainer__optionList'>
            <Link className='settingsContainer__option' to='/edit-my-info'>Mis Datos</Link>
            <br/>
            <Link className='settingsContainer__option' >Cambiar Contraseña</Link>
            <br/>
            {!rol && <Link className='settingsContainer__option' to='handle-accounts'>Gestionar cuentas</Link>}
            </div>
            <button className='settingsContainer__option' onClick={handleLogOut}>Log out</button>
        </section>


    )
}

export default Settings
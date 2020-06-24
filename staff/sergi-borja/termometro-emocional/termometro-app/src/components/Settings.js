import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Settings.sass'

function Settings({ rol, handleLogOut }) {

    return (
        <section className='settingsContainer'>
            <div className='settingsContainer__container'>
                <h1 className='settingsContainer__title'>Ajustes</h1>
            </div>
            <div className='settingsContainer__optionList'>
                <div className='settingsContainer__optionContainer'>
                <Link className='settingsContainer__option' to='/edit-my-info'>Mis Datos</Link>
                </div>
                <div className='settingsContainer__optionContainer'>
                <Link className='settingsContainer__option' to='/change-password'>Cambiar Contraseña</Link>
                </div>
                <div className='settingsContainer__optionContainer'>
                {!rol && <Link className='settingsContainer__option' to='handle-accounts'>Gestionar cuentas</Link>}
                </div>
            </div>
            <button className='settingsContainer__logOut' onClick={handleLogOut}>Salir</button>
        </section>


    )
}

export default Settings
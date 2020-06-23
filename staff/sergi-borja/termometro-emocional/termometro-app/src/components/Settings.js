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
                <Link className='settingsContainer__option' >Cambiar Contraseña</Link>
                </div>
                <div className='settingsContainer__optionContainer'>
                {!rol && <Link className='settingsContainer__option' to='handle-accounts'>Gestionar cuentas</Link>}
                </div>
            </div>
            <button className='settingsContainer__option' onClick={handleLogOut}>Log out</button>
        </section>


    )
}

export default Settings
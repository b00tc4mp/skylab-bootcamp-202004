import React from 'react'
import { Link } from 'react-router-dom'
import './Settings.sass'
import logo from '../images/logo-lagranja.png'
import arrowIcon from '../images/arrow.png'

function Settings({ rol, handleLogOut }) {

    return (
        <section className='settingsContainer'>
            <div className='settingsContainer__container'>
                <h1 className='settingsContainer__title'>Ajustes</h1>
            </div>
            <div className='settingsContainer__optionList'>
                <div className='settingsContainer__optionContainer'>
                <Link className='settingsContainer__option' to='/edit-my-info'>Mis Datos <img className='settingsContainer__arrowIcon' src={arrowIcon} alt='back button'></img></Link>
                </div>
                {!rol &&<div className='settingsContainer__optionContainer'>
                 <Link className='settingsContainer__option' to='handle-accounts'>Gestionar cuentas <img className='settingsContainer__arrowIcon' src={arrowIcon} alt='arrow'></img></Link>
                </div>}
            </div>
            <button className='settingsContainer__logOut' onClick={handleLogOut}>Salir</button>
            <div className='settingsContainer__creditsContainer' >
            {/* <p>This App has been developed by Sergi Borja</p> */}
            <p>Powered by:</p>
            <img alt='setting logo' src={logo} className='settingsContainer__logo'></img>
            </div>
        </section>


    )
}

export default Settings
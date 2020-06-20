import React, { useState } from "react";
import './Register.sass'
import { Link } from 'react-router-dom'
import { registerUser } from 'termometro-client-logic'
import Feedback from './Feedback'

function Register({ onGoToLogin }) {

  const [error, setError] = useState()

  const handleSubmit = event => {
    event.preventDefault()

    let { name, surname, age, sex, email, password } = event.target

    name = name.value
    surname = surname.value
    age = age.value
    sex = sex.value
    email = email.value
    password = password.value

    try {
      registerUser(name, surname, age, sex, email, password)
        .then(() => onGoToLogin())
        .catch(error => setError(error.message))
    } catch (error) {
      if(error) throw error
    }
  }

  return (
    <section className='registerContainer'>
      {/* <img src={logo} className='registerContainer__logo'></img> */}
      <h1 className='registerContainer__title'>CREA TU FAMILIA</h1>
      <div className='registerContainer__textDiv'>
        <h2 className='registerContainer__textDiv--text'>Rellena con tus datos para poder obtener lo máximo de la app</h2>
      </div>
      <form className='registerContainer__form' onSubmit={handleSubmit}>
        <input type="text" name="name" className='registerContainer__emailInput' placeholder='Nombre' required></input>
        <input type="text" name="surname" className='registerContainer__emailInput' placeholder='Apellido' required></input>
        <input name="age" className='registerContainer__emailInput' placeholder='Edad' required></input>
        <input name="sex" className='registerContainer__emailInput' placeholder='Sex' required></input>
        {/* <select className='registerContainer__emailInput' name='sex' required>
        <option>Sexo</option>
        <option>Masculino</option>
        <option>Femenino</option>
      </select> */}
        <input type="email" name="email" className='registerContainer__emailInput' placeholder='Email' required></input>
        <input type="password" name="password" className='registerContainer__passInput' placeholder='Contraseña' required minLength="8"></input>
        <button className='registerContainer__registerButton'>
          <span className='registerContainer__registerButton--text'>¡Crear!</span>
        </button>
        {error && <Feedback message={error} level="error" />}
      </form>

      <Link to={'/'} className='registerContainer__toLoginButton'>
        <span className='registerContainer__toLoginButton--text'>Ya estoy registrado</span>
      </Link>

    </section>
  );
}

export default Register;
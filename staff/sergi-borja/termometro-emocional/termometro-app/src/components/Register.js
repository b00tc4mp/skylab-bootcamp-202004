import React from "react";
import './Register.sass'
import { Link } from 'react-router-dom'
import { registerUser } from 'termometro-client-logic'

function Register({onGoToLogin}) {

const handleSubmit = event => {
  event.preventDefault()

  let { name, surname, age, sex, email, password } = event.target

  name = name.value
  surname = surname.value
  age = age.value
  sex= sex.value
  email = email.value
  password = password.value

  try {
    registerUser(name, surname, age, sex, email, password)
      .then(()=>onGoToLogin())
      .catch(error => console.log(error))
  } catch (error) {
    console.log(error)
  }
}

  return (
    <section className='loginContainer'>
    <div className='loginContainer__grayBackground'></div>
    {/* <img src={logo} className='loginContainer__logo'></img> */}
    <h1 className='loginContainer__title'>CREA TU FAMILIA</h1>
      <span className='loginContainer__loginText'>Rellena con tus datos para poder obtener lo máximo de la app</span>

    <form onSubmit={handleSubmit}>
      <input type="text" name="name" className='loginContainer__emailInput' placeholder='Nombre' required></input>
      <input type="text" name="surname" className='loginContainer__emailInput' placeholder='Apellido' required></input>
      <input name="age" className='loginContainer__emailInput' placeholder='Edad' required></input>
      <input name="sex" className='loginContainer__emailInput' placeholder='Sex' required></input>
      {/* <select className='loginContainer__emailInput' name='sex' required>
        <option>Sexo</option>
        <option>Masculino</option>
        <option>Femenino</option>
      </select> */}
      <input type="email" name="email" className='loginContainer__emailInput' placeholder='Email' required></input>
      <input type="password" name="password" className='loginContainer__passInput' placeholder='Contraseña' required minLength="8"></input>
      <button className='loginContainer__registerButton'>
      <span className='loginContainer__registerButton--text'>¡Crear!</span>
      </button>
    </form>

    <Link to={'/'} className='loginContainer__registerButton'>
      <span className='loginContainer__registerButton--text'>Ya estoy registrado</span>
    </Link>
    
  </section>
  );
}

export default Register;
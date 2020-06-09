import React from "react";
import './Login.sass'
import { Link } from 'react-router-dom'
import logo from '../images/logo-lagranja.png'
// import treeBackground from '../images/tree-background.jpg'

function Login() {

  return (
    <section className='loginContainer'>
          <img src={logo} className='loginContainer__logo'></img>
          <h1 className='loginContainer__title'>El termometro del autoestima</h1>
          <span className='loginContainer__loginText'>Alguien de mi familia ya me ha registrado:</span>
          <input className='loginContainer__emailInput' placeholder='Email'></input>
          <input className='loginContainer__passInput' placeholder='Contraseña'></input>
          <button className='loginContainer__loginButton'>
            <span className='loginContainer__loginButton--text'>¡Entra!</span>
          </button>
          <span className='loginContainer__registerText'>Quiero crear mi propia familia:</span>
          <Link to={'/register'} className='loginContainer__registerButton'>
            <span className='loginContainer__registerButton--text'>¡Crea tu familia!</span>
          </Link>
    </section>
  );
}

export default Login;

import React, { useState } from 'react'
import './Register.sass'
import { registerUser } from 'code-this-client-logic'
import Feedback from './Feedback'

function Register (props) {
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()
        let { name, email, password } = event.target

        name = name.value
        email = email.value
        password = password.value

        try {
            registerUser(name, email, password)
                .then(()=> props.history.push('/Signin'))
                .catch(error => setError(error.message))
        } catch ({message}) {
            setError(message)
        }
    }

    return (
        <div className="auth">
          <div className="auth__bg">
            <img className="auth__img" src="https://images.pexels.com/photos/265631/pexels-photo-265631.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" />
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit} className="form-info">
            <div className="form-info__input">
                <label htmlFor="name">Name</label>
                <input name='name' type="text" placeholder="Name" />
              </div>   
              <div className="form-info__input">
                <label htmlFor="email">Email</label>
                <input name="email" type="text" placeholder="Email" />
              </div>   
              <div className="form-info__input">
                <label htmlFor="password">Password</label>
                <input name="password" type="password" placeholder="Password" />
              </div>
              <div className="container-button">
                <button name="submit_btn" className="btn">SIGN UP </button>
                {error && <Feedback message={error} level="error" />}
              </div>
            </form>
          </div>
        </div>
)  
}
export default Register
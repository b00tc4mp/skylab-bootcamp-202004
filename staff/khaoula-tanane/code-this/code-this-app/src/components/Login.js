import React, { useState } from 'react'
import './Login.sass'
import { authenticateUser } from 'code-this-client-logic'
import Feedback from './Feedback'

function Login (props) {
    const [error, setError] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault()

        let { email, password } = event.target
        email = email.value
        password = password.value

        try{
          authenticateUser(email, password)
            .then(()=> props.history.push('/Panel'))
            .catch(error=> setError(error.message))
        } catch ({message}){
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
                <label htmlFor="email">Email</label>
                <input name="email" type="text" placeholder="Email" />
              </div>   
              <div className="form-info__input">
                <label htmlFor="password">Password</label>
                <input name="password" type="password" placeholder="Password" />
              </div>
              <div className="container-button">
                <button name="submit_btn" className="btn">SIGN IN</button>
                {error && <Feedback message={error} level="error" />}
              </div>
            </form>
          </div>
        </div>
)  
}
export default Login
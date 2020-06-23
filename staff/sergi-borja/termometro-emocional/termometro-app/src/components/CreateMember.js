import React, {useState} from 'react'
import { registerUser } from 'termometro-client-logic'
import './CreateMember.sass'
import Feedback from './Feedback'


function CreateMember({ token, history }) {

    const [gender, setGender] = useState()
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()

        let { name, surname, age, sex, location, email, password } = event.target

        name = name.value
        surname = surname.value
        age = age.value
        sex = gender
        location = location.value
        email = email.value
        password = password.value

        try {
            registerUser(name, surname, age, sex, location, email, password, token)
                .then(() => history.push('/my-family'))
                .catch(error => setError(error.message))
        } catch (error) {
            console.log(error)
        }

    }

    const handleGender = ({ target: { value } }) => {
        setGender(value)
    }

    return (
        <section className='createMemberContainer'>
            <h1 className='createMemberContainer__title'>¡Registra a un miembro de tu familia!</h1>
            <form className='createMemberContainer__form' onSubmit={handleSubmit}>
                <input type="text" name="name" className='createMemberContainer__emailInput' placeholder='Nombre' required></input>
                <input type="text" name="surname" className='createMemberContainer__emailInput' placeholder='Apellido' required></input>
                <input name="age" className='createMemberContainer__emailInput' placeholder='Edad' required></input>
                <select className='registerContainer__emailInput' onChange={(event) => handleGender(event)} name='sex' required>
                    <option value=''>Género</option>
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>
                </select>
                <input type="text" name="location" className='registerContainer__emailInput' placeholder='Província' required></input>
                <input type="email" name="email" className='createMemberContainer__emailInput' placeholder='Email' required></input>
                <input type="password" name="password" className='createMemberContainer__passInput' placeholder='Contraseña' required minLength="8"></input>
                <button className='createMemberContainer__registerButton'>
                    <span className='createMemberContainer__registerButton--text'>¡Crear!</span>
                </button>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
    )
}

export default CreateMember


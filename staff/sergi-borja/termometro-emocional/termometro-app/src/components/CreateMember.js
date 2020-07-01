import React, {useState} from 'react'
import { registerUser } from 'termometro-client-logic'
import './CreateMember.sass'
import Feedback from './Feedback'
import backButton from '../images/back-icon.png'


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
            console.error(error)
        }

    }

    const handleGender = ({ target: { value } }) => {
        setGender(value)
    }

    return (
        <section className='createMemberContainer'>
            <div className='createMemberContainer__header'>
            <img className='createMemberContainer__backIcon' src={backButton} onClick={()=>history.push('/my-family')}></img>
            <h1 className='createMemberContainer__headerTitle'>Crear</h1>
            </div>
            <h1 className='createMemberContainer__title'>¡Registra a un miembro de tu familia!</h1>
            <form className='createMemberContainer__form' onSubmit={handleSubmit}>
                <input type="text" name="name" className='createMemberContainer__input' placeholder='Nombre' required></input>
                <input type="text" name="surname" className='createMemberContainer__input' placeholder='Apellido' required></input>
                <input name="age" className='createMemberContainer__input' placeholder='Edad' required></input>
                <select className='createMemberContainer__input' onChange={(event) => handleGender(event)} name='sex' required>
                    <option value=''>Género</option>
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>
                </select>
                <input type="text" name="location" className='createMemberContainer__input' placeholder='Província' required></input>
                <input type="email" name="email" className='createMemberContainer__input' placeholder='Email' required></input>
                <input type="password" name="password" className='createMemberContainer__input' placeholder='Contraseña' required minLength="8"></input>
                <button className='createMemberContainer__registerButton'>
                    <span className='createMemberContainer__registerButton--text'>¡Crear!</span>
                </button>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
    )
}

export default CreateMember


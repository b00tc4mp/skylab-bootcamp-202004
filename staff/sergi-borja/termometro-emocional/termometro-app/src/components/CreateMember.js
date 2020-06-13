import React from 'react'
import { registerUser } from 'termometro-client-logic'
import './CreateMember.sass'

function CreateMember({ token }) {

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
            registerUser(name, surname, age, sex, email, password, token)
                .then(() => console.log('FIESTA'))
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <section className='createMemberContainer'>
            <h1 className='createMemberContainer__title'>¡Registra a un miembro de tu familia!</h1>
            <form className='createMemberContainer__form' onSubmit={handleSubmit}>
                <input type="text" name="name" className='createMemberContainer__emailInput' placeholder='Nombre' required></input>
                <input type="text" name="surname" className='createMemberContainer__emailInput' placeholder='Apellido' required></input>
                <input name="age" className='createMemberContainer__emailInput' placeholder='Edad' required></input>
                <input name="sex" className='createMemberContainer__emailInput' placeholder='Sex' required></input>
                <input type="email" name="email" className='createMemberContainer__emailInput' placeholder='Email' required></input>
                <input type="password" name="password" className='createMemberContainer__passInput' placeholder='Contraseña' required minLength="8"></input>
                <button className='createMemberContainer__registerButton'>
                    <span className='createMemberContainer__registerButton--text'>¡Crear!</span>
                </button>
            </form>
        </section>
    )
}

export default CreateMember


import React, { useState } from 'react'
import Feedback from './Feedback'
import './EditMember.sass'
import backButton from '../images/back-icon.png'

const { editUser } = require('termometro-client-logic')

function ChangePassword({ memberInfo, history }) {

    const [gender, setGender] = useState()
    const [error, setError] = useState()

    const handleGoToFamily = () => {
        history.push('/my-family')
    }

    const handleConfirmEdit = (event) => {
        event.preventDefault()

        let { name, surname, age, sex, location, email } = event.target

        name = name.value
        surname = surname.value
        age = age.value
        sex = gender
        location = location.value
        email = email.value

        if (name === "") name = memberInfo.name
        if (surname === "") surname = memberInfo.surname
        if (age === "") age = memberInfo.age
        if (!sex) sex = memberInfo.sex
        if (email === "") email = memberInfo.email
        if (location === "") location = memberInfo.location

        let memberId = memberInfo.id

        try {
            editUser(name, surname, age, sex, location, email, memberId)
                .then(() => handleGoToFamily())
                .catch(error => setError(error.message))
        } catch (error) {
            if (error) throw error
        }
    }

    const handleGender = ({ target: { value } }) => {
        setGender(value)
    }

    return (
        <section className='editMemberContainer'>
            <img className='editMemberContainer__backIcon' src={backButton} onClick={()=>history.push('/settings')}></img>
            <h1 className='editMemberContainer__title'>¡Este espacio es para que puedas actualizar tu contraseña!</h1>
            <form className='editMemberContainer__form' onSubmit={handleConfirmEdit}>
                <input className='editMemberContainer__input' name='email' type='email' placeholder='Contrasña actual..'></input>
                <input className='editMemberContainer__input' name='email' type='email' placeholder='Nueva contraseña..'></input>
                <button className='editMemberContainer__registerButton'>
                    <span className='editMemberContainer__registerButton--text'>Confirmar</span>
                </button>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
    );
}

export default ChangePassword;
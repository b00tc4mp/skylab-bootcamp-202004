import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Feedback from './Feedback'

const { editMember } = require('termometro-client-logic')

function EditMember({ token, memberInfo, history }) {

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
            editMember(name, surname, age, sex, location, email, memberId)
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
        <section className='createMemberContainer'>
            <h1 className='createMemberContainer__title'>¡Edita los datos de {memberInfo.name} que quieras actualizar!</h1>
            <form className='createMemberContainer__form' onSubmit={handleConfirmEdit}>
                <input classname='createMemberContainer__emailInput' name='name' type='text' placeholder={memberInfo.name} ></input>
                <input className='createMemberContainer__emailInput' name='surname' placeholder={memberInfo.surname}></input>
                <input className='createMemberContainer__emailInput' name='age' placeholder={memberInfo.age}></input>
                <select className='registerContainer__emailInput' onChange={(event) => handleGender(event)} name='sex'>
                    <option value=''>Género: {memberInfo.sex}</option>
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>
                </select>
                <input type="text" name="location" className='registerContainer__emailInput' placeholder={memberInfo.location}></input>
                <input className='createMemberContainer__emailInput' name='email' type='email' placeholder={memberInfo.email}></input>
                <button className='createMemberContainer__registerButton'>
                    <span className='createMemberContainer__registerButton--text'>Confirmar</span>
                </button>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
    );
}

export default EditMember;
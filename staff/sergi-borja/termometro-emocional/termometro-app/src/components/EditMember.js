import React, { useState } from 'react'
import Feedback from './Feedback'
import './EditMember.sass'
import backButton from '../images/back-icon.png'

const { editUser } = require('termometro-client-logic')

function EditMember({ memberInfo, history }) {

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
            <div className='createMemberContainer__header'>
            <img className='createMemberContainer__backIcon' src={backButton} onClick={()=>history.push('/my-family')}></img>
            <h1 className='createMemberContainer__headerTitle'>Editar</h1>
            </div>
            <h1 className='editMemberContainer__title'>¡Edita los datos de {memberInfo.name} que quieras actualizar!</h1>
            <form className='editMemberContainer__form' onSubmit={handleConfirmEdit}>
                <input className='editMemberContainer__input' name='name' placeholder={memberInfo.name}></input>
                <input className='editMemberContainer__input' name='surname' placeholder={memberInfo.surname}></input>
                <input className='editMemberContainer__input' name='age' placeholder={memberInfo.age}></input>
                <select className='editMemberContainer__input' onChange={(event) => handleGender(event)} name='sex'>
                    <option value=''>Género: {memberInfo.sex}</option>
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>
                </select>
                <input type="text" name="location" className='editMemberContainer__input' placeholder={memberInfo.location}></input>
                <input className='editMemberContainer__input' name='email' type='email' placeholder={memberInfo.email}></input>
                <button className='editMemberContainer__registerButton'>
                    <span className='editMemberContainer__registerButton--text'>Confirmar</span>
                </button>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
    );
}

export default EditMember;
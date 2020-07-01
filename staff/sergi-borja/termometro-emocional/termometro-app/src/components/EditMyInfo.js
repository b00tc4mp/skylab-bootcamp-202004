import React, { useState, useEffect } from 'react'
import Feedback from './Feedback'
import './EditMember.sass'
import retrieveUser from 'termometro-client-logic/retrieve-user'
import backButton from '../images/back-icon.png'

const { editUser } = require('termometro-client-logic')

function EditMyInfo({ token, history }) {

    const [gender, setGender] = useState()
    const [error, setError] = useState()
    const [userInfo, setUserInfo] = useState()
    const [userEdited, setUserEdited] = useState(false)

    useEffect(() => {
        if(token){
          try {
            retrieveUser(token)
              .then(user => {
                if (user) {
                  setUserInfo(user)
                }
              })
              .catch(error => { throw error })
          } catch (error) {
            if (error) throw error
          }
        }else history.push('/')
      }, [userEdited])

    const handleConfirmEdit = (event) => {
        event.preventDefault()

        let { name, surname, age, sex, location, email } = event.target

        name = name.value
        surname = surname.value
        age = age.value
        sex = gender
        location = location.value
        email = email.value

        if (name === "") name = userInfo.name
        if (surname === "") surname = userInfo.surname
        if (age === "") age = userInfo.age
        if (!sex) sex = userInfo.sex
        if (email === "") email = userInfo.email
        if (location === "") location = userInfo.location

        let memberId = userInfo.id

        try {
            editUser(name, surname, age, sex, location, email, memberId)
                .then(() => {
                  setUserEdited(true)
                  // history.push('/settings')
                  window.location.reload()
                })
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
            <img className='createMemberContainer__backIcon' src={backButton} onClick={()=>history.push('/settings')}></img>
            <h1 className='createMemberContainer__headerTitle'>Editar</h1>
            </div>
            <h1 className='editMemberContainer__title'>¡Aquí tienes la oportunidad de editar tus datos!</h1>
            {userInfo && <form className='editMemberContainer__form' onSubmit={handleConfirmEdit}>
                <input className='editMemberContainer__input' name='name' placeholder={userInfo.name}></input>
                <input className='editMemberContainer__input' name='surname' placeholder={userInfo.surname}></input>
                <input className='editMemberContainer__input' name='age' placeholder={userInfo.age}></input>
                <select className='editMemberContainer__input' onChange={(event) => handleGender(event)} name='sex'>
                    <option value=''>Género: {userInfo.sex}</option>
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>
                </select>
                <input type="text" name="location" className='editMemberContainer__input' placeholder={userInfo.location}></input>
                <input className='editMemberContainer__input' name='email' type='email' placeholder={userInfo.email}></input>
                <button className='editMemberContainer__registerButton'>
                    <span className='editMemberContainer__registerButton--text'>Confirmar</span>
                </button>
                {error && <Feedback message={error} level="error" />}
            </form>}
        </section>
    );
}

export default EditMyInfo;
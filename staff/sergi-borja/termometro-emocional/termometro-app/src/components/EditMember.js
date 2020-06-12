import React, { useEffect, useState } from 'react'
const { editMember } = require('termometro-client-logic')

function EditMember({ token, memberInfo }) {

    const handleConfirmEdit = (event) => {
        event.preventDefault()

        let { name, surname, age, sex, email } = event.target

        name = name.value
        surname= surname.value
        age = age.value
        sex = sex.value
        email = email.value 

        if(name === "") name = memberInfo.name
        if(surname === "") surname = memberInfo.surname
        if(age === "") age = memberInfo.age
        if(sex === "")  sex = memberInfo.sex
        if(email === "") email = memberInfo.email
        let memberId = memberInfo.id

        try {
            (async () => {
                await editMember(name, surname, age, sex, email, memberId)
            })()
        } catch (error) {
            if (error) throw error
        }
    }

    return (
        <form onSubmit={handleConfirmEdit}>
            <input name='name' placeholder={memberInfo.name}></input>
            <input name='surname' placeholder={memberInfo.surname}></input>
            <input name='age' placeholder={memberInfo.age}></input>
            <input name='sex' placeholder={memberInfo.sex}></input>
            <input name='email' placeholder={memberInfo.email}></input>
            <button>CONFIRM</button>
        </form>

    );
}

export default EditMember;
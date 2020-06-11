import React, { useEffect, useState } from 'react'
const { editMember } = require('termometro-client-logic')

function EditMember({ token, memberInfo }) {

    const handleConfirmEdit = (event) => {
        event.preventDefault()

        let { name, surname, age, sex, email } = event.target

        name? name = name.value : name = memberInfo.name
        surname? surname= surname.value : surname = memberInfo.name
        age? age = age.value : age = memberInfo.name
        sex? sex = sex.value : sex = memberInfo.name
        email? email = email.value : email = memberInfo.name

        try {
            (async () => {
                await editMember(token, name, surname, age, sex, email)
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
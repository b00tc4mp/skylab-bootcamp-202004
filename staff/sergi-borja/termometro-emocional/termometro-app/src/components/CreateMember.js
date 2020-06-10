import React from 'react'

function CreateMember() {

    const handleSubmit = event => {
        event.preventDefault()

        let { name, surname, age, sex, email, password } = event.target

        name = name.value
        surname = surname.value
        age = age.value
        sex = sex.value
        email = email.value
        password = password.value

     
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" className='loginContainer__emailInput' placeholder='Nombre' required></input>
            <input type="text" name="surname" className='loginContainer__emailInput' placeholder='Apellido' required></input>
            <input name="age" className='loginContainer__emailInput' placeholder='Edad' required></input>
            <input name="sex" className='loginContainer__emailInput' placeholder='Sex' required></input>
            <input type="email" name="email" className='loginContainer__emailInput' placeholder='Email' required></input>
            <input type="password" name="password" className='loginContainer__passInput' placeholder='Contraseña' required minLength="8"></input>
            <button className='loginContainer__registerButton'>
                <span className='loginContainer__registerButton--text'>¡Crear!</span>
            </button>
        </form>
    )
}

export default CreateMember


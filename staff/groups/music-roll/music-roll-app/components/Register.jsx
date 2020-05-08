
const { useState } = React

function Register({onLogin}) {

    const handleSubmit = (event) => {
        event.preventDefault()

        let {name,surname,email,password} = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        registerUser(name,surname,email,password, error => {

            if(error) console.error(error)
            
            onSubmit()
        })
    }

    return <section className="register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name"></input>
                <input type="text" name="surname"></input>
                <input type="text" name="email"></input>
                <input type="password" name="password"></input>
                <button>Submit</button>
            </form> or
            <a href="" onClick={(event) => {
                event.preventDefault()
                onLogin('login')
            }}>Go to login</a>
    </section>    

}


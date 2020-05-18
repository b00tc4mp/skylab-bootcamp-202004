const { useState } = React

function Register(props) {
  
    function handleSubmitRegister(event) {
        event.preventDefault()
        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        props.onSubmitRegister(name,surname, email, password)
    }
   
        return <section className="register">
            <h1>Register</h1>

            <form onSubmit={handleSubmitRegister} >
                <input type="text" name="name" placeholder="Name*"></input>
                <input type="text" name="surname" placeholder="Surname*"></input>
                <input type="email" name="email" placeholder="E-mail*"></input>
                <input type="password" name="password" placeholder="Password*"></input>
                <button>Submit</button>
        to <a href="" onClick={event => {
                    event.preventDefault()
                    props.onLogin('login')
                }}> Login</a>
            </form>
        </section>
    
}






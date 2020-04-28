
function Login({ onRegister }) {



    return <section className="login">
        <h1>Login</h1>
        <form onSubmit = {login(email,password)}>

            <input type="email" name="email" placeholder="e-mail*"></input>
            <input type="password" name="password" placeholder="password*"></input>
            <button>Submit</button>



                         to <a href="" onClick={event => {
                event.preventDefault()
                onRegister()
            }}>Register</a>
        </form>
    </section>


function login(email,password){

    loginUser(email, password)

}

}


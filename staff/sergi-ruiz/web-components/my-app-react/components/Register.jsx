function Register ({ onLogin }) {
    return <section className="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="Name*"></input>
        <input type="text" name="surname" placeholder="Surname*"></input>
        <input type="email" name="email" placeholder="E-mail*"></input>
        <input type="password" name="password" placeholder="Password*"></input>
        <button>Submit</button>
        to <a href="" onClick={event => {
            event.preventDefault()
            onLogin()
        }}> Login</a>
    </form>
</section>
}






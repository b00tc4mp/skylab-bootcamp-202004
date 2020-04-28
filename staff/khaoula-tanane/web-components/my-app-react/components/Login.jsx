function Login({onLoginSubmit, onRegister}) {
    return <section className="login">
        <h1>Login</h1>
        <form onSubmit={(event) => {
            event.preventDefault()
            onLoginSubmit(event)
        }}>
            <input  name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required />
            <button type='submit'>Submit</button>
             or <a href="" onClick={event => {
                 event.preventDefault()
                 onRegister()
             }}>Register</a>
        </form>
    </section>
}
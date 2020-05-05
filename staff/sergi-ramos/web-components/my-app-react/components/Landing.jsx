function Landing({ onRegister, onLogin}) {
    return <section className="landing">
        <h1>Wellcome to my App</h1>
        <a href="" onClick={event => {
            event.preventDefault()
            onRegister('register')
        }}>Register </a>or<a href="" onClick={event =>{
            event.preventDefault()
            onLogin('login')
        }}>Login</a>
    </section>
}

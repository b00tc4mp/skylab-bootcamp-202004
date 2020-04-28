function Landing({ onRegister, onLogin}) {
    return <section className="landing">
        <h1>Wellcome to my App</h1>
        <a href="" onClick={event => {
            event.preventDefault()
            onRegister()
        }}>Register </a>or<a href="" onClick={event =>{
            event.preventDefault()
            onLogin()
        }}>Login</a>
    </section>
}
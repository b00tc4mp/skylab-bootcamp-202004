function Landing({ toRegister }) {
    return <section className="landing">
        <h1>Wellcome to my App</h1>
        <a href="" onClick={event => {
            event.preventDefault()
            toRegister()
        }}>Register </a>or
        <a href="">Login</a>
    </section>
}
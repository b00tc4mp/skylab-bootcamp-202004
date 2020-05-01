function Landing({ onRegister }) {
    return <section class="landing">
        <a href="" onClick={ event => {
            event.preventDefault()

            onRegister()
        }}>Register</a> or <a href="">Login</a>
    </section>
}
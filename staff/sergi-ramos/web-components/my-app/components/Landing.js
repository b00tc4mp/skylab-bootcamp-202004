class Landing extends Components {
    constructor(onRegister, onLogin) {
        super(`<section class="landing">
                <h1>Wellcome to my App</h1>
                <a href="">Register </a>or
                <a href="">Login</a>
                </section>`)

        const [register, login] = this.container.querySelectorAll('a')

        register.addEventListener('click',  () => {
            event.preventDefault()
            onRegister()
        })
        login.addEventListener('click', () => {
            event.preventDefault()
            onLogin()

        })
    }
}
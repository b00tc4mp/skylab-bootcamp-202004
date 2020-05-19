class Landing extends Component {
    constructor(onLogin, onRegister) {
        super(`<section class='landing'>
            <h1>Already member? Are you new? </h1>
            <a href="">Login</a> or <a href="">Register</a>
        </section>`)

        const [register, login] = this.container.querySelectorAll('a')

        register.addEventListener('click', function (event) {
            event.preventDefault()

            onRegister()
        })

        login.addEventListener('click', function (event) {
            event.preventDefault()

            onLogin()
        })
    }
}
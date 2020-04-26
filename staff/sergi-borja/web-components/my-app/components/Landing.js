class Landing extends Component {
    constructor(onRegister, onLogin) {
        super(`<section class="landing">
    <a href="" id="regist" type="button">Register</a> <a href="" id="login" type="button">Login</a>
</section>`)

        // const anchors = container.querySelectorAll('a')
        // const register = anchors[0]
        // const login = anchors[1]

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
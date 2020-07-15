class Login extends Component {
    constructor(onSubmit, onRegister) {
        super(`<section class="login">
        <h1 class="title-login">Login</h1>
        <form>
        <input class="input-mail" type="email" name="email" placeholder="e-mail" required>
            <input class="input-pass" type="password" name="password" placeholder="password" required>
            <button class="submit-button">Submit</button>
            or <a class="register-login" href="">Register</a>
        </form>
    </section>`)

        const form = this.container.querySelector('form')

        let feedback

        form.addEventListener('submit', event => {
            event.preventDefault()

            let { email, password } = event.target

            email = email.value
            password = password.value

            try {
                onSubmit(email, password)

                cleanUp()
            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error')

                    this.container.append(feedback.container)
                } else feedback.innerText = error.message
            }
        })

        const cleanUp = () => {
            form.email.value = ''
            form.password.value = ''

            if (feedback) {
                this.container.removeChild(feedback.container)

                feedback = undefined
            }
        }

        const register = this.container.querySelector('a')

        register.addEventListener('click', function (event) {
            event.preventDefault()

            onRegister()

            cleanUp()
        })
    }
}
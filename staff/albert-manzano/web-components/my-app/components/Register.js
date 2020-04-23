class Register extends Component {
    constructor(onSubmit, onLogin) {

        super(`<section class="register">
            <h1>Register</h1>
            <form>
                <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}">
                <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}">
                <input type="email" name="email" placeholder="e-mail" required>
                <input type="password" name="password" placeholder="password" required minLength="8">
                <button>Submit</button>
                or <a href="">Login</a>
            </form>
            </section>`)

        const form = this.container.querySelector('form')

        let feedback

        form.addEventListener('submit', event => {
            event.preventDefault()

            const name = event.target.name.value,
                surname = event.target.surname.value,
                email = event.target.email.value,
                password = event.target.password.value

            try {
                onSubmit(name, surname, email, password)

                cleanUp()
            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error')

                    this.container.append(feedback.container)
                } else feedback.innerText = error.message
            }
        })

        const cleanUp = () => {
            form.name.value = ''
            form.surname.value = ''
            form.email.value = ''
            form.password.value = ''

            if (feedback) {
                this.container.removeChild(feedback.container)

                feedback = undefined
            }
        }

        const login = this.container.querySelector('a')

        login.addEventListener('click', event => {
            event.preventDefault()

            onLogin()

            cleanUp()
        })

    }
}
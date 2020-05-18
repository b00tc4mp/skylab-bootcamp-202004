class Register extends Components {
    constructor(onSubmit, toLogin) {
        super(`<section class="register">
            <h1>Register</h1>
            <form>
                <input type="text" name="name" placeholder="Name*">
                <input type="text" name="surname" placeholder="Surname*">
                <input type="email" name="email" placeholder="E-mail*">
                <input type="password" name="password" placeholder="Password*">
                <button>Submit</button>
                to <a href=""> Login</a>
            </form>
        </section>`)

        const form = this.container.querySelector('form')
        const loginButton = this.container.querySelector('a')
        let feedback

        form.addEventListener('submit', (event) => {
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
                    debugger
                    sendErrorMessage(error)
                } else {
                    this.container.removeChild(feedback.container)
                    feedback = undefined
                    sendErrorMessage(error)
                }
            }
        })
        loginButton.addEventListener('click', (event) => {
            event.preventDefault()
            toLogin()
            cleanUp()
        })
        const sendErrorMessage = (error) => {
            feedback = new Feedback(error.message)
            this.container.appendChild(feedback.container)
        }
        const cleanUp = () => {
            form.email.value = ''
            form.password.value = ''
            form.name.value = ''
            form.surname.value = ''

            if (feedback) {
                this.container.removeChild(feedback.container)
                feedback = undefined
            }
        }
    }
}
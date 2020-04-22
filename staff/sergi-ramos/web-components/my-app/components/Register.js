class Register extends Components {
    constructor(onSubmit, toLogin) {
        super(`<section class="register">
            <h1>Register</h1>
            <form>
                <input type="text" name="name" placeholder="name">
                <input type="text" name="surname" placeholder="surname">
                <input type="email" name="email" placeholder="e-mail">
                <input type="password" name="password" placeholder="password">
                <button>Submit</button>
                to<a href="">Login</a>
            </form>
        </section>`)

        const form = this.container.querySelector('form')
        const loginButton = this.container.querySelector('a')
        let feedback
        const self = this
        form.addEventListener('submit', function (event) {
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
                    feedback = new Feedback(error.message)
                    self.container.appendChild(feedback.container)
                } else {
                    self.container.removeChild(feedback.container)
                    feedback = undefined
                    feedback = new Feedback(error.message)
                    self.container.append(feedback.container)
                }
            }
        })
        loginButton.addEventListener('click', function (event) {
            event.preventDefault()
            toLogin()
            cleanUp()
        })

        function cleanUp() {
            form.email.value = ''
            form.password.value = ''
            form.name.value = ''
            form.surname.value = ''

            if (feedback) {
                self.container.removeChild(feedback.container)
                feedback = undefined
            }
        }
    }
}
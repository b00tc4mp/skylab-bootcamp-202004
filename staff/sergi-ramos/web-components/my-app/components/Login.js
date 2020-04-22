class Login extends Components {
    constructor(onSubmit, toRegister) { 
        super(`<section class="login">
                    <h1>Login</h1>
                    <form>
                        <input type="email" name="email" placeholder="e-mail">
                        <input type="password" name="password" placeholder="password">
                         <button>Submit</button>
                         to <a href="">Register</a>
                    </form>
                </section>`)
        
        const form = this.container.querySelector('form')
        const registerButton = this.container.querySelector('a')
        let feedback;
        const self = this
        form.addEventListener('submit', function (event) {

            event.preventDefault()

            const email = event.target.email.value,
                password = event.target.password.value

            try {
                onSubmit(email, password)
                cleanUp()

            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message)
                    self.container.appendChild(feedback.container)
                } else {
                    feedback.container.innerText = error.message
                }
            }
        })
        registerButton.addEventListener('click', function (event) {
            event.preventDefault()

            toRegister()
            cleanUp()
        })

        function cleanUp() {
            form.email.value = ''
            form.password.value = ''

            if (feedback) {
                self.container.removeChild(feedback.container)
                feedback.container = undefined
            }
        }
    }
}
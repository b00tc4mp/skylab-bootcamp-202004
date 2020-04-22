class Login extends Component {
    constructor(onSubmit, onRegister) {
        super(`<section class="login">
        <h1>Login</h1>
        <form>
            <input type="email" name="email" placeholder="e-mail" required>
            <input type="password" name="password" placeholder="password" required>
            <button>Submit</button>
        </form>
        <a href="">Register</a>
    </section>`)

        const form = this.container.querySelector('form')

        const register = this.container.querySelector('a')

        let feedback

        const self = this

        form.addEventListener('submit', function (event) {
            event.preventDefault()

            const email = event.target.email.value,
                password = event.target.password.value

            try {
                onSubmit(email, password)

                cleanUp()
                
            } catch(error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error')

                    self.container.append(feedback.container)
                } else feedback.innerText = error.message
            }

        })

        register.addEventListener('click', function(event){
            event.preventDefault()

            onRegister()

            cleanUp()
        })

        function cleanUp() {
            form.email.value = ''
            form.password.value = ''
            
            if (feedback) {
                self.container.removeChild(feedback.container)

                feedback = undefined
            }
        }
    }
}
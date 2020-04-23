class Register extends Component {
    constructor (registerUser, onLogin) {
        super(`<section class="register">
        <h1>Register</h1>
        <form>
            <input type="text" name="name" placeholder="name">
            <input type="text" name="surname" placeholder="surname">
            <input type="email" name="email" placeholder="e-mail">
            <input type="password" name="password" placeholder="password">
            <button>Submit</button> or
            <a href="">login</a>
        </form>
        </section>`)
        const self = this
        let feedback
        const form = this.container.querySelector('form')
        const link = this.container.querySelector('a')
    
        function clean() {
            form.email.value = '';
            form.password.value = '';
            form.name.value = '';
            form.surname.value = '';
            if (feedback) {
                self.container.removeChild(feedback)
                feedback = undefined
            }
        }
    
        form.addEventListener('submit', function(event) {
            event.preventDefault()
    
            const name = event.target.name.value,
                surname = event.target.surname.value,
                email = event.target.email.value,
                password = event.target.password.value
    
            try {
                registerUser(name, surname, email, password)
                clean();
            } catch (error) {
                if (!feedback) {
                    feedback = Feedback(error.message, 'error')
                    self.container.append(feedback)
                } else feedback.innerText = error.message
            }
        })
    
        link.addEventListener('click', function() {
            event.preventDefault();
            onLogin();
            clean();
        })
    }
}
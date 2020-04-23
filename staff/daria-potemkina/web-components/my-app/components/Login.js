class Login extends Component {
    constructor(onSubmit, onRegister) {
        super(`<section class="login">
    <h1>Login</h1>
    <form>
        <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required minLength = "8">
        <button>Submit</button>
        <a href="">Register</a>
    </form>
</section>`)

        const form = this.container.querySelector('form');
        const register = this.container.querySelector('a');

        let feedback;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const email = event.target.email.value,
                password = event.target.password.value

            try {
                onSubmit(email, password)

                cleanUp()

            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error')
                    this.container.appendChild(feedback.container)
                } else feedback.innerText = error.message
            }
        });

        const cleanUp = () => {
            form.email.value = ''
            form.password.value = ''

            if (feedback) {
                this.container.removeChild(feedback.container)

                feedback = undefined
            }
        }

        register.addEventListener('click', function (event) {
            event.preventDefault();

            onRegister()

            cleanUp()
        });
    }
};
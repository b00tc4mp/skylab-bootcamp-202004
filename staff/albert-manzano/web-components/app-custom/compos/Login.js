class Login extends Component {
    constructor(toSubmit, toRegister) {

        super(`<section class="login">
            <h1>Login</h1>
            <form>
                <p>Email Adress: <br><input type="email" name="email" required></p>
                <p>Password: <br><input type="password" name="password"  required></p>
                <button class="button">Login</button><br> or <br> <a href="">Register</a>
            </form>
        </section>`);

        const form = this.contain.querySelector('form');
        let feedback;

        form.addEventListener('submit', event => {
            event.preventDefault();

            let email = event.target.email.value,
                password = event.target.password.value;

            try {
                toSubmit(email, password);

                cleanUp();
            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error');

                    this.contain.appendChild(feedback.contain);
                } else feedback.innerText = error.message;
            }
        })

        const cleanUp = () => {
            form.email.value = ''
            form.password.value = ''

            if (feedback) {
                this.contain.removeChild(feedback.contain);
                feedback = undefined;
            }
        }

        const register = this.contain.querySelector('a');

        register.addEventListener('click', event => {
            event.preventDefault();
            toRegister();
            cleanUp();
        });
    }
}
class Login extends Component {
    constructor(onSubmit,onRegister) {
        super(`<section class="login">
    <h2 class='login__title'>LOGIN</h2>
    <form action="" class="login__form">
        <input class="login__input" type="email" name='email' placeholder="E-Mail" required>
        <p></p>
        <input class="login__input" type="password" name='password' placeholder="Password" required>
        <p></p>
        <button class='login__button'>Submit</button>
        <a href="">Register</a>
    </form>
</section>`)


        const form = this.container.querySelector('form');

        let feedback;

        form.addEventListener('submit', event => {
            event.preventDefault();

            let { email, password } = event.target;
            email = email.value;
            password = password.value;

            try {
                onSubmit(email, password);
                cleanUp()
            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error');
                    this.container.append(feedback.container);

                } else {
                    feedback.innerText = error.message
                }
            }
        })

        const cleanUp = () => {
            form.email.value = '';
            form.password.value = '';

            if (feedback) {
                this.container.removeChild(feedback.container);
                feedback = undefined;
            }
        }

        const register = this.container.querySelector('a');

        register.addEventListener('click', event => {
            event.preventDefault();
            onRegister();
            cleanUp();
        })
    }
}
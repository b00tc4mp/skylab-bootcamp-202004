class Login extends Component {
    constructor(onSubmit, onRegister) {
        super(`<section class="login">
        <h1>Login</h1>
        <form>
            <input type="email" name="email" placeholder="e-mail">
            <input type="password" name="password" placeholder="password">
            <button>Submit</button>
            or <a href="">Register</a>
        </form>
    </section>`);

        const form = this.container.querySelector('form');

        let feedback

        form.addEventListener('submit', event => {
            event.preventDefault();

            let { email, password } = event.target;

            email = email.value,
                password = password.value;

            try {
                onSubmit(email, password);

                cleanUp();
            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error');

                    this.container.append(feedback.container);
                } else {
                    feedback.innerText = error.message;
                }
            }      
        });

        const cleanUp = () => {
            form.email.value = '';
            form.password.value = '';

            if (feedback) {
                this.container.removeChild(feedback.container);

                feedback = undefined;
            }
        };

        const register = this.container.querySelector('a');

        register.addEventListener('click', event => {
            event.preventDefault();

            onRegister();

            cleanUp();
        })  
    };
};
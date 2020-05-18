class Register extends Component {
    constructor(onSubmit, onLogin) {
        super(`<section class="register">
        <h2 class='register__title'>REGISTER</h2>
        <form action="" class="register__form">
            <input class="register__input" type="text" name='name' placeholder="Name" required>
            <input class="register__input" type="text" name='surname' placeholder="Surname" required>
            <input class="register__input" type="email" name='email' placeholder="E-Mail" required>
            <input class="register__input" type="password" name='password' placeholder="Password" required>
            <button class='register__button'>Submit</button>
            <a href="">Login</a>
        </form>
    </section>`)

        const form = this.container.querySelector('form');

        let feedback;

        form.addEventListener('submit', event => {
            event.preventDefault();
            let { name, surname, email, password } = event.target
            name = name.value,
                surname = surname.value,
                email = email.value,
                password = password.value

            try {
                onSubmit(name, surname, email, password);
                cleanUp();
            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error');

                    this.container.append(feedback.container);
                } else {
                    feedback.innerText = error.message;
                }
            }
        })

        const cleanUp = () => {
            const {name,surname,email,password} = form; 
            name.value = '';
            surname.value = '';
            email.value = '';
            password.value = '';

            if (feedback) {
                this.container.removeChild(feedback.container);
                feedback = undefined;
            }
        }

        const login = this.container.querySelector('a');

        login.addEventListener('click', event => {
            event.preventDefault();
            onLogin();
            cleanUp();
        })
    }
}
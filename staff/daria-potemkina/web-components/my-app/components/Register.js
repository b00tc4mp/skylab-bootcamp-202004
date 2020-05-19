class Register extends Component {
    constructor(onSubmit, onLogin) {
        super(`<section class="register"><h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name" required patern = "[A-Za-z]{1,20}">
        <input type="text" name="surname" placeholder="surname" required patern = "[A-Za-z]{1,20}">
        <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required minLength = "8">
        <button>Submit</button>
        <a href="">Log in</a>
    </form><section>`)

        const form = this.container.querySelector('form');
        const login = this.container.querySelector('a');

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

                cleanUp()

            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error')
                    this.container.appendChild(feedback.container)
                } else feedback.innerText = error.message
            }

        })

        const cleanUp = () => {
            form.name.value = ''
            form.surname.value = ''
            form.email.value = ''

            form.password.value = ''

            if (feedback) {
                this.container.removeChild(feedback.container)
                feedback = undefined
            }
        }

        login.addEventListener('click', function (event) {
            event.preventDefault();

            onLogin()

            cleanUp()
        });
    }
}
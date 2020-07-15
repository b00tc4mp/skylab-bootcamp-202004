class Login extends Component{
    // || inject text in html ||

    constructor(user, onRegister) {
        super(`<div class="login">
            <section class="login__container">
            <h1>Login</h1>
            <form>
            <label for="email">Email</label>
            <input type="email" name="email" placeholder="e-mail">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="password">
            <button>Submit</button>
            <a href="">register</a>
            </form>
            </section>
        </div>`)

    // || declaration of variables || 
    
        const form = this.container.querySelector('form')
        const link = this.container.querySelector('a')
        let feedback
        let style = document.createElement('style');

    // || functions declaration ||

        form.addEventListener('input', () => {
            if (feedback) {
                form.children[4].removeChild(feedback.container)
                feedback = undefined
            }
            // style un crossig the submit text
            form.appendChild(style);
            style.sheet.insertRule('.register__container button { text-decoration: none}')
        })

        const clean = () => { //cambiado el clean
            form.email.value = '';
            form.password.value = '';
            if (feedback) {
                this.container.removeChild(feedback.container)
                feedback = undefined
            }
        }
        form.addEventListener('submit', (event) => {
            event.preventDefault()

            const email = event.target.email.value,
                password = event.target.password.value
            try {
                user(email, password)
                clean();
            } catch (error) {
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error')
                    form.appendChild(style);
                    style.sheet.insertRule('.login__container button { text-decoration: line-through}')
                    form.children[4].append(feedback.container)
                } else feedback.container.innerText = error.message
            }
        })

        link.addEventListener('click', function() {
            event.preventDefault();
            onRegister();
            clean();
        })
    }
}
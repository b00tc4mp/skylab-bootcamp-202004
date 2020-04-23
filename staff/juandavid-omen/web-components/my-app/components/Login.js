function Login(onSubmit, onRegister) {
    Component.call(this, `<section class="login">
        <h1>Login</h1>
        <form>
            <input type="email" name="email" placeholder="e-mail">
            <input type="password" name="password" placeholder="password">
            <button>Submit</button>
            or <a href="">Register</a>
        </form>
    </section>`)

    const form = this.container.querySelector('form');

    let feedback;

    const self = this;
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let {email, password} = event.target;

        email = email.value,
        password = password.value;
         
        try {
            onSubmit(email, password)

            cleanUp()
        } catch(error) {
            if (!feedback) {
                feedback = Feedback(error.message, 'error');

                self.container.append(feedback.container);
            } else {
                feedback.innerText = error.message;
            }
        }    
    })    
    
    function cleanUp() {
        form.email.value = '';
        form.password.value = '';
        
        if (feedback) {
        container.removeChild(feedback);

        feedback = undefined;
        }
        
    }

    const register = this.container.querySelector('a');

    register.addEventListener('click', function (event) {
        event.preventDefault();

        onRegister();

        cleanUp();
    })

    return container;
}

Login.prototype = Object.create(Component.prototype);
Login.prototype.Constructor = Login;
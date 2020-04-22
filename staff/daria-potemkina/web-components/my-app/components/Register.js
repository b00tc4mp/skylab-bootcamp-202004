function Register(onSubmit, onLogin) {

    const temp = document.createElement('div');

    temp.innerHTML = `<section class="register"><h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name" required patern = "[A-Za-z]{1,20}">
        <input type="text" name="surname" placeholder="surname" required patern = "[A-Za-z]{1,20}">
        <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required minLength = "8">
        <button>Submit</button>
        <a href="">Log in</a>
    </form><section>`

    const container = temp.firstChild;
    const form = container.querySelector('form');
    const login = container.querySelector('a');

    let feedback;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = event.target.name.value,
            surname = event.target.surname.value,
            email = event.target.email.value,
            password = event.target.password.value

        try {
            onSubmit(name, surname, email, password);

            cleanUp()

        } catch (error) {
            if (!feedback) {
                feedback = Feedback(error.message, 'error')
                container.appendChild(feedback)
            } else feedback.innerText = error.message
        }

    });

    function cleanUp() {
        form.name.value = ''
        form.surname.value = ''
        form.email.value = ''
        form.password.value = ''

        if (feedback) {
            container.removeChild(feedback)
            feedback = undefined
        }
    }

    login.addEventListener('click', function (event) {
        event.preventDefault();

        onLogin()

        cleanUp()
    });

    return container;
};
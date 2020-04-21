function Register(registerUser, onLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name">
        <input type="text" name="surname" placeholder="surname">
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button> or
        <a href="">login</a>
    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')
    const link = container.querySelector('a')

    function clean() {
        form.email.value = '';
        form.password.value = '';
        if (feedback) {
            container.removeChild(feedback)
            feedback = undefined
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault()

        const name = event.target.name.value,
            surname = event.target.surname.value,
            email = event.target.email.value,
            password = event.target.password.value

        registerUser(name, surname, email, password)

        try {
            registerUser(name, surname, email, password)
        } catch (error) {
            if (!feedback) {
                feedback = Feedback(error.message, 'error')
                container.append(feedback)
            } else feedback.innerText = error.message
        }

        clean();
    })

    link.addEventListener('click', function() {
        event.preventDefault();
        onLogin();
        clean();
    })


    return container
}
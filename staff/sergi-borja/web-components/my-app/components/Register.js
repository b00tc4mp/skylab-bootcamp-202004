function Register(onSubmit, onLogin) {
    const container = mount(`<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}">
        <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}">
        <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required minLength="8">
        <button>Submit</button>
        or <a href="">Login</a>
    </form>
</section>`)

    const form = container.querySelector('form')

    let feedback

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            onSubmit(name, surname, email, password)

            cleanUp()
        } catch (error) {
            if (!feedback) {
                feedback = Feedback(error.message, 'error')

                container.append(feedback)
            } else feedback.innerText = error.message
        }
    })

    function cleanUp() {
        const { name, surname, email, password } = form

        name.value = ''
        surname.value = ''
        email.value = ''
        password.value = ''

        if (feedback) {
            container.removeChild(feedback)

            feedback = undefined
        }
    }

    const login = container.querySelector('a')

    login.addEventListener('click', function (event) {
        event.preventDefault()

        onLogin()

        cleanUp()
    })

    return container
}
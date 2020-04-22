function Login(onSubmit, onRegister) {
    const container = mount(`<section class="login">
    <h1>Login</h1>
    <form>
    <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required>
        <button>Submit</button>
        or <a href="">Register</a>
    </form>
</section>`)

    const form = container.querySelector('form')

    let feedback

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            onSubmit(email, password)

            cleanUp()
        } catch (error) {
            if (!feedback) {
                feedback = Feedback(error.message, 'error')

                container.append(feedback)
            } else feedback.innerText = error.message
        }
    })

    function cleanUp() {
        form.email.value = ''
        form.password.value = ''

        if (feedback) {
            container.removeChild(feedback)

            feedback = undefined
        }
    }

    const register = container.querySelector('a')

    register.addEventListener('click', function (event) {
        event.preventDefault()

        onRegister()

        cleanUp()
    })

    return container
}
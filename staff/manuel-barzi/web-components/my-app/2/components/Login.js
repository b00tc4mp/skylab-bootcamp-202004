function Login(onSubmit, onRegister) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
    <h1>Login</h1>
    <form>
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
        or <a href="">Register</a>
    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')
    
    let feedback

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const email = event.target.email.value,
            password = event.target.password.value

        onSubmit(email, password, function (error) {
            if (!feedback) {
                feedback = Feedback(error, 'error')

                container.append(feedback)
            } else feedback.innerText = error

        }, function() {
            event.target.email.value = ''
            event.target.password.value = ''

            if (feedback) container.removeChild(feedback)
        })
    })

    const register = container.querySelector('a')

    register.addEventListener('click', function (event) {
        event.preventDefault()

        onRegister()
    })

    return container
}
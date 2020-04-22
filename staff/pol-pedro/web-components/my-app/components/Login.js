function Login(user, onRegister) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
    <h1>Login</h1>
    <form>
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button> or
        <a href="">register</a>
    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')
    const link = container.querySelector('a')
    let feedback

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

        const email = event.target.email.value,
            password = event.target.password.value
        try {
            user(email, password)
            clean();
        } catch (error) {
            if (!feedback) {
                feedback = Feedback(error.message, 'error')
                container.append(feedback)
            } else feedback.innerText = error.message
        }
    })

    link.addEventListener('click', function() {
        event.preventDefault();
        onRegister();
        clean();
    })

    return container
}
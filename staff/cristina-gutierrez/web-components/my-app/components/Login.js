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

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const email = event.target.email.value,
            password = event.target.password.value

        onSubmit(email, password)
    });

    const register = container.querySelector("a");

    register.addEventListener('click', function (event) {
        event.preventDefault()

        onRegister()
    });

    return container
}
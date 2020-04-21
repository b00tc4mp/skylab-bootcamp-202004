function Register(onSubmit, toLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name">
        <input type="text" name="surname" placeholder="surname">
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
        to<a href="">Login</a>
    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')
    const loginButton = container.querySelector('a')

    form.addEventListener('submit', function (event) { 
        event.preventDefault()

        const name = event.target.name.value,
            surname = event.target.surname.value,
            email = event.target.email.value,
            password = event.target.password.value

        onSubmit(name, surname, email, password)
    })
    loginButton.addEventListener('click', function (event) {
        event.preventDefault()
        toLogin()


    })

    return container
}
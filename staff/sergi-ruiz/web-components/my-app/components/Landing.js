function Landing(onRegister, onLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="Landing">
    <h1>Landing</h1>
    <button>Register</button>
    <button>Login</button>
    </section>`

    const container = temp.firstChild

    const [register, login] = container.querySelectorAll('button')
    register.addEventListener('click', function(event) {
        event.preventDefault();

        onRegister()
    })

    login.addEventListener('click', function(event) {
        event.preventDefault();

        onLogin()
    })


    return container
}
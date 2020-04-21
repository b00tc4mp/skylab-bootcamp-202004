function Landing(callback) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="register">
        <h1>Landing</h1>
        <form>
            <button>Login</button>
            <button>Register</button>
        </form>
    </section>`

    const container = temp.firstChild

    const loginButton = container.querySelectorAll('button')[0]
    const registerButton = container.querySelectorAll('button')[1]

    loginButton.addEventListener('click', function (event) {
        event.preventDefault()

        landing.replaceWith(login)
    })
    
    registerButton.addEventListener('click', function (event) {
        event.preventDefault()

        landing.replaceWith(register)
    })

    return container
}
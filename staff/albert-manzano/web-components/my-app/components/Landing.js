function Landing(onRegister,onLogin) {
    const temp = document.createElement('div');

    temp.innerHTML = `<section class='landing'>
    <h1>Already member? 🤡 Are you new? </h1>
    <a href="">Login</a> or <a href="">Register</a>
    </section>`

    const container = temp.firstChild;

    const [register, login] = container.querySelectorAll('a')


    register.addEventListener('click', function (event) {
        event.preventDefault()

        onRegister()
    })

    login.addEventListener('click', function (event) {
        event.preventDefault()

        onLogin()
    })

    return container
}
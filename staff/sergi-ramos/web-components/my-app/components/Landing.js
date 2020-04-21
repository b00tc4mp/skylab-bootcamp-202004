'use stric'
function Landing(onRegister, onLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="landing">
<h1>Wellcome to my App</h1>
<a href="">Register </a>or
<a href="">Login</a>
</section>`

    const container = temp.firstChild
    const [register, login] = container.querySelectorAll('a')

    register.addEventListener('click', function () {
        event.preventDefault()
        onRegister()

    })
    login.addEventListener('click', function () {
        event.preventDefault()
        onLogin()

    })
    return container
}


function Landing(goRegister, goLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="landing">
        <h1>Welcome</h1>
        <a href="" >Register</a>
        <a href="" >Login</a>
    </section>`
    const container = temp.firstChild
    const [register, login] = container.querySelectorAll('a')
    
    register.addEventListener('click', function (event) {
        event.preventDefault()
        goRegister()
    })
    login.addEventListener('click', function (event) {
        event.preventDefault()
        goLogin()
    })
    return container
}
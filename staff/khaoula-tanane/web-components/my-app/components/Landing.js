function Landing(goRegister, goLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
    <h1>Welcome</h1>
        <button id>Register</button>
        <button>Login</button>

</section>`

    const container = temp.firstChild
    const [register, login] = container.querySelectorAll('button')

    /*const register = container.firstChild.nextSibling.nextSibling.nextSibling
    const login = register.nextSibling.nextSibling*/

    register.addEventListener("click",function(event){
        event.preventDefault()
        goRegister()
    })

    login.addEventListener("click",function(event){
        event.preventDefault()
        goLogin()
    })

    return container
}
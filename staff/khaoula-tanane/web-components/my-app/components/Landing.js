function Landing(goRegister, goLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
    <h1>Welcome</h1>
        <button>Register</button>
        <button>Login</button>

</section>`

    const container = temp.firstChild

    const register = container.firstChild.nextSibling.nextSibling.nextSibling
    const login = register.nextSibling.nextSibling

    register.addEventListener("click",function(){
        goRegister()
    })

    login.addEventListener("click",function(){
        goLogin()
    })

    return container
}
function Landing(goRegister,goLogin) {
    //Elemento que aparece cuando abre la web
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
    <h1>Welcome</h1>
    <a href="" >Register</a>
    <a href="" >Login</a>
    </section>`

    const container = temp.firstChild    
    const [register, login] = container.querySelectorAll('a')

    register.addEventListener('click', function() {
        event.preventDefault();
        goRegister();
    })
    login.addEventListener("click",function(){
        event.preventDefault();
        goLogin();
    })
    return container
}
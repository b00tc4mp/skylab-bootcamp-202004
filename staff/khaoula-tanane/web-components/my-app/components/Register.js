function Register(callback, goLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name">
        <input type="text" name="surname" placeholder="surname">
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
        <button id="gotologin">Login</button>
        
    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')
    const login = container.querySelector("#gotologin")
    login.addEventListener("click",function(){
        goLogin()
    })

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const name = event.target.name.value,
            surname = event.target.surname.value,
            email = event.target.email.value,
            password = event.target.password.value

        callback(name, surname, email, password)
    })

    return container
}
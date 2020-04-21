function Login(onSubmit, toLogin) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
    <h1>Login</h1>
    <form>
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
        to <a href="">Register</a>
    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')
    const register = container.querySelector('a')
    let feedBack;

    form.addEventListener('submit', function (event) { 
        debugger
        event.preventDefault()

        const email = event.target.email.value,
            password = event.target.password.value

        try {
            onSubmit(email, password)
            if(feedBack){
                container.removeChild(feedBack)
                feedBack = undefined
            }

        } catch (error) {
            if (!feedBack) {
                feedBack = Feedback(error.message)
                container.appendChild(feedBack)
            }else{
                feedback.innerText = error.message
            }


        }

    })
    register.addEventListener('click', function (event) {
        event.preventDefault()

        toLogin()
    })


    return container
}
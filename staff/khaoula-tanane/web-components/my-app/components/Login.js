function Login(callback, goRegister) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
    <h1>Login</h1>
    <form>
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
        <button id="gotoregister">Register</button>

    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')

    let feedback
    function cleanUp() {
        form.email.value = ''
        form.password.value = ''

        if (feedback) {
            container.removeChild(feedback)

            feedback = undefined
        }
    }

    const register = container.querySelector("#gotoregister")
    register.addEventListener("click",function(){
        event.preventDefault()
        goRegister()
        cleanUp()
    })

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const email = event.target.email.value,
            password = event.target.password.value

        try{
            callback(email, password)
            cleanUp()
        } catch (error){
            if(!feedback){
                feedback = Feedback(error.message, 'error')
                container.append(feedback)
        } else feedback.innerText = error.message
    }
    })

    return container
}
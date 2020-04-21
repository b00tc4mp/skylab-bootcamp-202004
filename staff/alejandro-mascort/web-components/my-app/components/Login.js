function Login(onSubmit, onRegister) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
    <h1>Login</h1>
    <form>
        <input type="email" name="email" placeholder="e-mail" required>
        <input type="password" name="password" placeholder="password" required>
        <button>Submit</button>
    </form>
    <a href="">Register</a>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')

    const register = container.querySelector('a')

    let feedback


    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const email = event.target.email.value,
            password = event.target.password.value

        try {
            onSubmit(email, password)

            cleanUp()
            
        } catch(error) {
            if (!feedback) {
                feedback = Feedback(error.message, 'error')

                container.append(feedback)
            } else feedback.innerText = error.message
        }

    })

    register.addEventListener('click', function(event){
        event.preventDefault()

        onRegister()

        cleanUp()
    })

    function cleanUp() {
        form.email.value = ''
        form.password.value = ''
        
        if (feedback) {
            container.removeChild(feedback)

            feedbacK = undefined
        }
    }

    return container
}
function Login(onSubmit, toRegister) {  
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
    let feedback;

    form.addEventListener('submit', function (event) { debugger
        
        event.preventDefault()

        const email = event.target.email.value,
            password = event.target.password.value

        try { 
            onSubmit(email, password)

            cleanUp()

        } catch (error) {
            if (!feedback) {
                feedback = Feedback(error.message)
                container.appendChild(feedback)
            }else{
                feedback.innerText = error.message
            }
        }
    })
    register.addEventListener('click', function (event) {
        event.preventDefault()

        toRegister()
        cleanUp()
    })

    function cleanUp(){  debugger
         form.target.email = ''
         form.target.password = ''

         if(feedback){
            container.removeChild(feedback)
            feedback = undefined
        }
    }

    return container
}
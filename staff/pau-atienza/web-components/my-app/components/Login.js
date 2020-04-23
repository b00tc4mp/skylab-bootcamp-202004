function Login(onSubmit, onRegister) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="login">
        <h1>Login</h1>
        <form>
            <input type="email" name="email" placeholder="e-mail">
            <input type="password" name="password" placeholder="password">
            <button>Submit</button> or <a href = ''>Register</a>
        </form>
    </section>`

    const container = temp.firstChild
    const form = container.querySelector('form')
    let feedback

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const [email, password ] = [event.target.email.value,event.target.password.value]
        
        try{
            onSubmit(email, password)
            
        }catch(error){
            if(!feedback){
                feedback = Feedback(error.message, 'error')
                container.appendChild(feedback)
            }else{
                feedback.innerText = error.message
            }
        }
    })

    const toRegister = container.querySelector('a')
    
    toRegister.addEventListener('click', function (event) {
        event.preventDefault()
        onRegister()
    })
    return container
}
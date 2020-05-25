'use strict'
class Login extends Component {
    constructor(callback, goRegister){
        super(`<section class="login">
        <h1>Login</h1>
        <form>
        <input type="email" name="email" placeholder="e-mail" value="a@a.com">
        <input type="password" name="password" placeholder="password" value="12345678">
        <button>Submit</button>
        <button id="gotoregister">Register</button>
        </form>
        </section>`)

        
        const form = this.container.querySelector('form')
        let feedback
        
        form.addEventListener('submit', event => {
            event.preventDefault()
            
            let { email, password } = event.target

            email = email.value
            password = password.value
            
            try{
                callback(email, password)
                cleanUp()
            } catch (error){
                if(!feedback){
                    feedback = new Feedback(error.message, 'error')
                    this.container.append(feedback.container)
                } else feedback.innerText = error.message
            }
        })
                
        function cleanUp() {
            form.email.value = ''
            form.password.value = ''
            
            if (feedback) {
                this.container.removeChild(feedback.container)
                
                feedback = undefined
            }
        }

        
        const register = this.container.querySelector("#gotoregister")
        register.addEventListener("click",function(){
            event.preventDefault()
            goRegister()
            cleanUp()
        })
        
    }
}
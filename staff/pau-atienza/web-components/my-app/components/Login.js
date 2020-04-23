class Login extends Component{
    constructor(onSubmit, onRegister){ 
    
        super(`<section class="login">
                <h1>Login</h1>
                <form>
                    <input type="email" name="email" placeholder="e-mail">
                    <input type="password" name="password" placeholder="password">
                    <button>Submit</button> or <a href = ''>Register</a>
                </form>
            </section>`)
         
        const form = this.container.querySelector('form')
        let feedback

        form.addEventListener('submit', event => {
            event.preventDefault()
            debugger 
            const [email, password ] = [event.target.email.value, event.target.password.value]
            try{
                onSubmit(email, password)
                
            }catch(error){
                if(!feedback){
                    feedback = new Feedback(error.message, 'error')
                    this.container.appendChild(feedback.container)
                }else{
                    feedback.container.innerText = error.message
                }
            }
        })
        const toRegister = this.container.querySelector('a')
        
        toRegister.addEventListener('click', event => {
            event.preventDefault()
            onRegister()
        })
    }
}
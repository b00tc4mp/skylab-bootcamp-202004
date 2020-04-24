class Landing extends Component {
    constructor(goLogin, goRegister){
        super(`<section class="login">
            <h1>Welcome</h1>
            <button id>Register</button>
            <button>Login</button>
            </section>`)
            
            const [register, login] = this.container.querySelectorAll('button')
            
            register.addEventListener("click",function(event){
                event.preventDefault()
                goLogin()
            })
            
            login.addEventListener("click",function(event){
                event.preventDefault()
                goRegister()
            })  
 
        }
}
class Landing extends Component{
    constructor(goRegister, goLogin) {
        super(`<section class="landing">
                <h1>Welcome</h1>
                <a href="" >Register</a>
                <a href="" >Login</a>
            </section>`)
        const [register, login] = this.container.querySelectorAll('a')
        
        register.addEventListener('click',event=> {
            event.preventDefault()
            goRegister()
        })
        login.addEventListener('click', event=> {
            event.preventDefault()
            goLogin()
        })
    
    }
}
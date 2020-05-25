class Register extends Component{
    constructor(callback, goLogin) {
    super(`<section class="register">
    <h1>Register</h1>
    <form>
        <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}">
        <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}">
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
        <button id="gotologin">Login</button>
        
    </form>
</section>`)

    let feedback

    function cleanUp() {
        form.name.value = ''
        form.surname.value = ''
        form.email.value = ''
        form.password.value = ''

        if (feedback) {
            this.container.removeChild(feedback)

            feedback = undefined
        }
    }

    const form = this.container.querySelector('form')
    const login = this.container.querySelector("#gotologin")
    login.addEventListener("click",function(){
        goLogin()
    })

    form.addEventListener('submit', event => {
        event.preventDefault()

        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try{
            callback(name, surname, email, password)
            cleanUp()
        
        } catch (error){
            if (!feedback){
                feedback = Feedback(error.message, 'error')
                this.container.appendChild(feedback.container)
            } else feedback.innerText = error.message
        }
    })

    }
}

class Register extends Component{
    constructor(props) {
        super(props)
        this.state = {error: ''}
    }
    // || function when the user is send to check if available to register ||

    logicRegister = () => {
        debugger
        event.preventDefault()
        let {name, surname, email, password} = event.target
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            this.props.onSumbmit (name, surname, email, password) 
        } catch ({message}) {
               this.classButon = 'buton-cross'
               this.setState ({error: message})
        }
    }

    // || function that changes the style of the button and cros it out ||

    input = () => {
        this.classButon = undefined
        this.setState ({error: ''})
    }

    // || render ||
 
    render = () => {
        return <div className="register" onClick = { event => {
            this.props.onLanding()
        }}> 
            <section className="register__container" onClick = { event => { event.stopPropagation()}}>
                <h1>Register</h1>
                <form onSubmit = {this.logicRegister} onInput = {this.input}>
                    <label for="name">First name</label>
                    <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
                    <label for="surname">Second name</label>
                    <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" /> 
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="e-mail" required />
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="password" required minLength="8" />
                    <button className={this.classButon}>
                        Submit 
                        {this.state.error && <Feedback message={this.state.error} level="error" />}
                    </button>
                    <a href="" href="" onClick = { event => { 
                    event.preventDefault()
                    this.props.onLogin()
                    }}>Login</a>
                </form>
            </section>
        </div>
    }


}



    {/* </div>class Register extends Component {
     constructor (registerUser, onLogin) {
         super(`<div class="register">
         <section class="register__container">
             <h1>Register</h1>
             <form>
                 <label for="name">First name</label>
                 <input type="text" name="name" placeholder="name">
                 <label for="surname">Second name</label>
                 <input type="text" name="surname" placeholder="surname">
                 <label for="email">Email</label>
                 <input type="email" name="email" placeholder="e-mail">
                 <label for="password">Password</label>
                 <input type="password" name="password" placeholder="password">
                 <button>Submit</button>
                 <a href="">login</a>
             </form>
         </section>
         </div>`)
         let feedback
         const form = this.container.querySelector('form')
         const link = this.container.querySelector('a')
         let style = document.createElement('style');
    
         const clean = () => {
             form.email.value = '';
             form.password.value = '';
             form.name.value = '';
             form.surname.value = '';
             if (feedback) {
                 form.children[8].removeChild(feedback.container)
                 feedback = undefined
             }
         }

         form.addEventListener('input', () => {
             if (feedback) {
                 form.children[8].removeChild(feedback.container)
                 feedback = undefined
             }
              style un crossig the submit text
             form.appendChild(style);
             style.sheet.insertRule('.register__container button { text-decoration: none}')
         })
    
         form.addEventListener('submit', (event) => {
             event.preventDefault()
    
             const name = event.target.name.value,
                 surname = event.target.surname.value,
                 email = event.target.email.value,
                 password = event.target.password.value
    
             try {
                 registerUser(name, surname, email, password)
                 clean();
             } catch (error) {
                 if (!feedback) {
                     feedback = new Feedback(error.message, 'error')
                      style crossig the submit text
                     form.appendChild(style);
                     style.sheet.insertRule('.register__container button { text-decoration: line-through}')
                     form.children[8].append(feedback.container)form.insertBefore(feedback.container, form.children[8]) form.append(feedback.container)
                 } else feedback.container.innerText = error.message
             }
         })
    
         link.addEventListener('click', function() {
             event.preventDefault();
             onLogin();
             clean();
         })
     }
 } }  */}
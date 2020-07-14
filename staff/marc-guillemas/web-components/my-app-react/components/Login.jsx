// class Login extends Component {
//     constructor(onSubmit, onRegister) {
//         super(`<section class="login">
//         <h1>Login</h1>
//         <form>
//         <input type="email" name="email" placeholder="e-mail" required>
//         <input type="password" name="password" placeholder="password" required>
//         <button>Submit</button>
//         or <a href="">Register</a>
//         </form>
//         </section>`)

//         const form = this.container.querySelector('form')

//         let feedback

//         const self = this

//         form.addEventListener('submit', function(event) {
//             event.preventDefault()

//             let {email, password} = event.target

//             email = email.value
//             password = password.value

//             try {
//                 onSubmit(email, password)

//                 cleanUp()
//             } catch (error) {
//                 if (!feedback) {
//                     feedback = new Feedback(error.message, 'error')

//                     self.container.append(feedback.container)
//                 } else feedback.innerText = error.message
                
//             }


//         })

//         function cleanUp() {
//             form.email.value = ''
//             form.password.value = ''

//             if (feedback) {
//                 self.container.removeChild(feedback.container)

//                 feedback = undefined
//             }
//         }

//         const register = this.container.querySelector('a')

//         register.addEventListener('click', function (event) {
//             event.preventDefault()

//             onRegister()

//             cleanUp()
//         })
//     }
// }
const {Component} = React
class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            error : ""
        }
    }

    onSubmitForm = event => {
        event.preventDefault()

        let {email, password} = event.target
        email = email.value
        password = password.value

        try {
            
            this.props.onSubmit(email, password)

        } catch ({message}) {
            
            this.setState({error: message}) 
        }
    }

    render() {
        return <section className="login">
        <h1>Login</h1>
        <form onSubmit={this.onSubmitForm}>
        <input type="email" name="email" placeholder="e-mail" required />
        <input type="password" name="password" placeholder="password" required />
        <button>Submit</button>
        or <a href="" onClick={ event => {
            event.preventDefault()
    
            this.props.onRegister('register')
        }}>Register</a> 
        
        {this.state.error && <Feedback message={this.state.error} level='error'/>}

        </form>
        </section>
    }

   
}
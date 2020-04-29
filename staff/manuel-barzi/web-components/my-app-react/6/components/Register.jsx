// class Register extends Component {
//     constructor(onSubmit, onLogin) {
//         super(`<section class="register">
//     <h1>Register</h1>
//     <form>
//         <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}">
//         <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}">
//         <input type="email" name="email" placeholder="e-mail" required>
//         <input type="password" name="password" placeholder="password" required minLength="8">
//         <button>Submit</button>
//         or <a href="">Login</a>
//     </form>
// </section>`)

//         const form = this.container.querySelector('form')

//         let feedback

//         form.addEventListener('submit', event => {
//             event.preventDefault()

//             let { name, surname, email, password } = event.target

//             name = name.value
//             surname = surname.value
//             email = email.value
//             password = password.value

//             try {
//                 onSubmit(name, surname, email, password)

//                 cleanUp()
//             } catch (error) {
//                 if (!feedback) {
//                     feedback = new Feedback(error.message, 'error')

//                     this.container.append(feedback.container)
//                 } else feedback.innerText = error.message
//             }
//         })

//         const cleanUp = () => {
//             const { name, surname, email, password } = form

//             name.value = ''
//             surname.value = ''
//             email.value = ''
//             password.value = ''

//             if (feedback) {
//                 this.container.removeChild(feedback.container)

//                 feedback = undefined
//             }
//         }

//         const login = this.container.querySelector('a')

//         login.addEventListener('click', function (event) {
//             event.preventDefault()

//             onLogin()

//             cleanUp()
//         })
//     }
// }

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = { error: '' }
    }

    handleSubmit = event => {
        event.preventDefault()

        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            this.props.onSubmit(name, surname, email, password)
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
        return <section className="register">
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
                <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                or <a href="">Login</a>

                {this.state.error && <Feedback message={this.state.error} level="error" />}
            </form>
        </section>
    }
}
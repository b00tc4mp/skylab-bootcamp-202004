const {Component} = React

class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            error: ''
        }
    }

    onSubmitForm = event =>{
        event.preventDefault()
        
        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        
        try {
            this.props.onSubmit(name,surname,email,password);
    
        } catch ({message}) {
           this.setState({error: message})

        }
    }
    
    render(){
        return <section className="register">
        <h1>Register</h1>
        <form onSubmit={this.onSubmitForm}>
        <input type="text" name="name" placeholder="name"/>
        <input type="text" name="surname" placeholder="surname"/>
        <input type="email" name="email" placeholder="e-mail"/>
        <input type="password" name="password" placeholder="password"/>
        <button>Submit</button>
        <a href="" onClick={ event => {
            event.preventDefault()
            
            this.props.onLogin('login')
        }}>Login</a>
        
        {this.state.error && <Feedback message={this.state.error} level='error'/>}
        
        </form>
        </section>
    }
    
    
    // const form = this.container.querySelector('form')
    
    // let feedback
    
    // const self = this
    
    // form.addEventListener('submit', function (event) {
    //     event.preventDefault()
        
    //     let {name, surname, email, password} = event.target
        
    //     name = name.value
    //     surname = surname.value
    //     email = email.value
    //     password = password.value
        
    //     try {
    //         onSubmit(name, surname, email, password)
            
    //         cleanUp()
    //     } catch (error) {
    //         if (!feedback) {
    //             feedback = new Feedback(error.message, 'error')
                
    //             self.container.append(feedback.container)
    //         } else feedback.innerText = error.message
    //     }
        
    // })
    
    // function cleanUp() {
    //     const {name, surname, email, password} = form
        
    //     name.value = ''
    //     surname.value = ''
    //     email.value = ''
    //     password.value = ''
        
    //     if (feedback) {
    //         self.container.removeChild(feedback.container)
            
    //         feedback = undefined
    //     }
    // }
}
// class Login extends Component{
//     constructor(onSubmit, onRegister){ 
    
//         super(`<section class="login">
//                 <h1>Login</h1>
//                 <form>
//                     <input type="email" name="email" placeholder="e-mail">
//                     <input type="password" name="password" placeholder="password">
//                     <button>Submit</button> or <a href = ''>Register</a>
//                 </form>
//             </section>`)
         
//         const form = this.container.querySelector('form')
//         let feedback

//         form.addEventListener('submit', event => {
//             event.preventDefault()
            
//             const {email, password} = event.target

//             try{
//                 onSubmit(email.value, password.value)
                
//             }catch(error){
//                 if(!feedback){
//                     feedback = new Feedback(error.message, 'error')
//                     this.container.appendChild(feedback.container)
//                 }else{
//                     feedback.container.innerText = error.message
//                 }
//             }
//         })
//         const toRegister = this.container.querySelector('a')
        
//         toRegister.addEventListener('click', event => {
//             event.preventDefault()
//             onRegister()
//         })
//     }
// }

function Login({callback}){
    return <section className="login">
                     <h1>Login</h1>
                     <form onSubmit = {(event) => {
                                event.preventDefault();
                                let {email, password} = event.target;
                                email = email.value
                                password = password.value
                                try{
                                authenticateUser(email,password)
                                console.log('te quiero <3<3<3')
                                callback('home')
                            } catch(error){
                                console.log(error)
                            }
                            }}>
                         <input type="email" name="email" placeholder="e-mail"/>
                         <input type="password" name="password" placeholder="password"/>
                         <button>Submit</button> or <a href = '' onClick = {(event) => {
                        event.preventDefault()
                        callback('register')
                     }}>Register</a>
                     </form>
                 </section>
}
// class Register extends Component{
//     constructor(onSubmit, onLogin){
//         super(`<section class="register">
//             <h1>Register</h1>
//             <form>
//                 <input type="text" name="name" placeholder="name">
//                 <input type="text" name="surname" placeholder="surname">
//                 <input type="email" name="email" placeholder="e-mail">
//                 <input type="password" name="password" placeholder="password">
//                 <button>Submit</button> or <a href = ''>Login</a>
//             </form>
//         </section>`)

//         const form = this.container.querySelector('form')
//         let feedback

//         form.addEventListener('submit', event=> {
//             event.preventDefault()
    
//             const name = event.target.name.value,
//                 surname = event.target.surname.value,
//                 email = event.target.email.value,
//                 password = event.target.password.value
//             try{
//                 onSubmit(name, surname, email, password)
//             } catch(error){
    
//                 if(!feedback){
//                     feedback= new Feedback(error.message,"error");
//                     this.container.appendChild(feedback.container);
//                 }else{
//                     feedback.container.innerText=error.message;
//                 }
//             }
//         })
//         const toLogin = this.container.querySelector('a')
        
//         toLogin.addEventListener('click', event=> {
//             event.preventDefault()
//             onLogin()
//         })
//     }
// }

function Register({callback, uponRegister}){
    return <section className="register">
                 <h1>Register</h1>
                 <form onSubmit  = {(event) => {
                        event.preventDefault();
                        let {name, surname, email, password} = event.target;
                        name = name.value
                        surname = surname.value
                        email = email.value
                        password = password.value
                        try{
                        registerUser(name,surname,email,password)
                        callback('login')
                        } catch(error){
                            console.log(error)
                        }
                    }}>
                     <input type="text" name="name" placeholder="name"/>
                     <input type="text" name="surname" placeholder="surname"/>
                     <input type="email" name="email" placeholder="e-mail"/>
                     <input type="password" name="password" placeholder="password"/>
                     <button>Submit</button> or <a href = '' onClick = {(event) => {
                        event.preventDefault()
                        callback('login')
                     }}>Login</a>
                 </form>
             </section>
}

// function submitForm(event){
//     event.preventDefault();
//     let {name, surname, email, password} = event.target;
//     name = name.value
//     surname = surname.value
//     email = email.value
//     password = password.value
//     try{
//        registerUser(name,surname,email,password)
//        callback('login')
//    } catch(error){
//        console.log(error)
//    }
// }
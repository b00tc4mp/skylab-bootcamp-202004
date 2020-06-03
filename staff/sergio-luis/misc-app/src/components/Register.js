import React from 'react';
import Feedback from './Feedback'
import './Register.sass';
import { registerUser } from 'misc-client-logic';

const {useState}=React

export default function ({goToLogin}){

const [error,setError] = useState()

   const  handleSubmit = (event) => {
        event.preventDefault()
        
        let {name,surname,email,password} = event.target;
        
        name = name.value;
        surname = surname.value;
        email = email.value;
        password = password.value;
        
        try{
            registerUser(name,surname,email,password)
                .then(()=> goToLogin())
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
            }

        return <section  className="register">
                <h2  className='register__title'>REGISTER</h2>
                <form action=""  className="register__form" onSubmit={handleSubmit} >
                    <input  className="register__input" type="text" name='name' placeholder="Name" required />
                    <input  className="register__input" type="text" name='surname' placeholder="Surname" required/>
                    <input  className="register__input" type="email" name='email' placeholder="E-Mail" required/>
                    <input  className="register__input" type="password" name='password' placeholder="Password" required/>
                    <button  className='register__button'>Submit</button>
                    <a href="" onClick={event =>{
                        event.preventDefault()
                        goToLogin()
                    }}>Login</a>
                    {error && <Feedback message={error} level='error'/>}
                </form>
            </section>
    }

     

//     handleSubmit = (event) => {
//         event.preventDefault()

//         let {name,surname,email,password} = event.target;

//         name = name.value;
//         surname = surname.value;
//         email = email.value;
//         password = password.value;

//         try{
//             registerUser(name,surname,email,password, (error) =>{
//                 if(error) return this.setState({error:error.message})
//                 this.props.onRegister();
//             })
//         }catch({message}){
//             this.setState({error:message})
//         }
//     }

//     render(){
//         return <section  className="register">
//                 <h2  className='register__title'>REGISTER</h2>
//                 <form action=""  className="register__form" onSubmit={this.handleSubmit}>
//                     <input  className="register__input" type="text" name='name' placeholder="Name" required />
//                     <input  className="register__input" type="text" name='surname' placeholder="Surname" required/>
//                     <input  className="register__input" type="email" name='email' placeholder="E-Mail" required/>
//                     <input  className="register__input" type="password" name='password' placeholder="Password" required/>
//                     <button  className='register__button'>Submit</button>
//                     <a href="" onClick={event =>{
//                         event.preventDefault()
//                         this.props.onClick('login')
//                     }}>Login</a>
//                     {this.state.error && <Feedback message={this.state.error} level='error'/>}
//                 </form>
//             </section>
//     }

//   }      
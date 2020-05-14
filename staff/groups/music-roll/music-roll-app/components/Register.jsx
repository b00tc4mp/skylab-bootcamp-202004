
const { useState } = React

function Register({onLogin, onSubmit}) {

  const [error, setError] = useState(undefined)

    const handleSubmit = (event) => {
        event.preventDefault()

        let {name,surname,email,password} = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
      try{
        registerUser(name,surname,email,password, error => {
          
            if(error) setError(error.message)
            
            onSubmit()
        })
      }catch({message}){
        setError(message)
      }
    }

    return  <section className="register">
    <div className="register__container">
      <h1 className="register__header">Register</h1>
      <hr className="register__divider" />
      <form onSubmit={handleSubmit} className="register__form">      
        <label htmlFor="name">Name</label>          
        <input className="register__input" type="text" name="name" placeholder="John" />
        <label htmlFor="surname">Surname</label>
        <input className="register__input" type="text" name="surname" placeholder="Doe" />
        <label htmlFor="email">Email</label>
        <input className="register__input" type="text" name="email" placeholder="john@doe.com" />
        <label htmlFor="password">Password</label>
        <input className="register__input" type="password" name="password" placeholder="********" />
        <button className="register__button">Sing Up</button>
        <a href="" onClick={(event) => {
                event.preventDefault()
                onLogin('login')
            }}>Already registered? SignIn now! </a>
      </form>
    </div>
    {error && <Feedback message={error}/>}
  </section>
  
}


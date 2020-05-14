const { useState } = React

function Register({ onGoToLogin, onGoToLanding }) {
    
    const [error,setError] = useState(undefined);

    const handleGoToLogin = () => {
        event.preventDefault()
        onGoToLogin()}
    const handleGoToLanding = () => {
        event.preventDefault()
        onGoToLanding()
    }

    const handleSubmitRegister = (event) =>{
        event.preventDefault()

        let{name,surname,email,password,confirmPassword} = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        confirmPassword = confirmPassword.value

        try{
            registerUser(name,surname,email,password,confirmPassword, (error) =>{
                if(error) return setError(error.message)

                onGoToLogin()
            })
        }catch({message}){
            setError(message)
        }

    }

    return <>
        <section className="register">
            <div className="register__container">
                <div className="register__logo">
                    <img src="img/logo.svg" className="register__logo-item" />
                </div>
                <form className="register__input" onSubmit={handleSubmitRegister}>
                    <h1 className="register__title">REGISTER</h1>
                    <input type="text" name="name" className="register__input-item" placeholder="name*" />
                    <input type="text" name="surname" className="register__input-item" placeholder="surname*" />
                    <input type="text" name="email" className="register__input-item" placeholder="email*" />
                    <input type="password" name="password" className="password" className="register__input-item" placeholder="password*" />
                    <input type="password" name="confirmPassword" className="password" className="register__input-item" placeholder="confirm password*" />
                    <button className="register__input-button">REGISTER</button>
                    {error && <Feedback message={error} level="register" />}
                </form>
                <div className="register__goto">
                    <a href="" onClick={handleGoToLanding}><img src="img/arrow_left.svg" alt="go-to-landing" className="register__goto-landing" /></a>
                    <p className="register__goto-text-landing">landing</p>
                    <p className="register__goto-text-login">login</p>
                    <a href="" onClick={handleGoToLogin}><img src="img/arrow_right.svg" alt="go-login" className="register__goto-login" /></a>
                </div>
            </div>
        </section>
    </>

}
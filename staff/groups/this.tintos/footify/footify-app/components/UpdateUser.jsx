const { useState } = React

function UpdateUser({onGoToHome, token}){
    
    // return <>
    // <h1>USER</h1>
    // </>
    const [ error, setError ] = useState()

    const handleUpdateUser = (event) =>{
        event.preventDefault()

        let {name, surname, email, password, oldPassword} = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        oldPassword = oldPassword.value

        const newData = {name, surname, email, password, oldPassword}

            try {
                updateUser(token, newData, error =>{
                    if (error) return setError(error.message)

                    onGoToHome()
                })
            } catch ({message}) {
                setError(message)
            }
        }
 
    const handleGoToHome = () => onGoToHome()

    return <>
    <section className="update">
        <div className="update__container">
            <div className="update__logo">
                <img src="img/logo.svg" className="update__logo-item" />
            </div>
        
        <form className="update__form" onSubmit={handleUpdateUser}>
            <h1 className="update__title">Dani</h1>
          <input type="text" name="name" className="update__form-item" placeholder="new name(optional)" />
          <input type="text" name="surname" className="update__form-item" placeholder="new surname (optional)" /> 
          <input type="text" name="email" className="update__form-item" placeholder="new email (optional)" />
          <input type="password" name="password" className="update__form-item" placeholder="new password (optional)" />
          <input type="password" name="oldPassword" className="update__form-item" placeholder="old password (required)" />
          <button type="submit" className="update__form-button">ACCEPT</button>
          {error && <Feedback message={error} level="error"/>}
        </form>

        <div className="update__goto">
            <a href="" onClick={handleGoToHome}><img src="img/arrow_left.svg" alt="go-to-home" className="update__goto-home" /></a>
            <p className="update__goto-text">back</p>
        </div>
        </div>
      </section>
      </>
}
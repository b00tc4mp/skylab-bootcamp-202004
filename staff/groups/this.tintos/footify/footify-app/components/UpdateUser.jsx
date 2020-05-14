const { useState } = React

function UpdateUser({onGoToFwitter, token, userDetails,onUserSessionExpired}){
    
    const [ error, setError ] = useState()
    const [success, setSuccess ] = useState()

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
                updateUser(token, newData, (error, success) =>{
                    if (error) {
                        if (error.message === 'invalid token')
                            onUserSessionExpired()
                        else throw setError(error.message);

                    }else{
                        setSuccess(success)
                    }    
                })
            } catch ({message}) {
                setError(message)
            }
        }
 
     const handleSubmitFwitter = (event) =>{
            event.preventDefault()
    
            onGoToFwitter()
        }
   

    return <>
    <section className="update">
        <div className="update__container">
            <div className="update__logo">
                <img src="img/logo.svg" className="update__logo-item" />
            </div>
        
        <form className="update__form" onSubmit={handleUpdateUser}>
            <h1 className="update__title">{/*`${name} ${surname}`*/}</h1>
          <input type="text" name="name" className="update__form-item" placeholder="new name(optional)" />
          <input type="text" name="surname" className="update__form-item" placeholder="new surname (optional)" /> 
          <input type="text" name="email" className="update__form-item" placeholder="new email (optional)" />
           <hr className="update__form-line"/>
          <input type="password" name="password" className="update__form-item" placeholder="new password (optional)" />
          <input type="password" name="oldPassword" className="update__form-item" placeholder="old password (optional)" />
          <button type="submit" className="update__form-button">ACCEPT</button>
          {error && <Feedback message={error} level="error"/>}
          {success && <Feedback message={success} level="success"/>}
        </form>

        <div className="update__goto">
            <a href="" onClick={handleSubmitFwitter}><img src="img/arrow_left.svg" alt="go-to-home" className="update__goto-home" /></a>
            <p className="update__goto-text">back</p>
        </div>
        </div>
      </section>
      </>
}
function Landing({ onGoToRegister, onGoToLogin  }) {
    const handleGoToRegister = (event) => {
        event.preventDefault()

        onGoToRegister()
    }

    const handleGoToLogin = (event) =>{
        event.preventDefault()

        onGoToLogin()
    }

   return <section className="landing">
       <a href="" onClick={handleGoToRegister}>Register</a> or <a href="" onClick={handleGoToLogin}>Login</a>
    </section>
}
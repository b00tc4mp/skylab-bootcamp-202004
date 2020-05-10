function Landing({onGoToLogin,onGoToRegister}){

    const handleGoToRegister = () => { onGoToRegister()}
    const handleGoToLogin = () => { onGoToLogin()}
      
    return <>
        <section className="landing">
            <div className="landing__container">
                <div className="landing__logo">
                    <img src="img/logo.svg" className="landing__logo-item" />
                </div>
                <div className="landing__info">Lorem ipsum dolor sit,
                amet consectetur adipisicing elit. Corporis reprehenderit sunt nisi et quaerat nostrum blanditiis nulla
                maiores quae aliquam ipsam voluptatem, id numquam!
          </div>
                <div className="landing__nav">
                    <button className="landing__button" onClick={handleGoToLogin}>LOGIN</button>
                    <button className="landing__button" onClick={handleGoToRegister}>REGISTER</button>
                </div>
            </div>
        </section>
    </>
}
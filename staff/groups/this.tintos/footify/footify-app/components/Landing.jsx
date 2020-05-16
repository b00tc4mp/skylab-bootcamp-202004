function Landing({onGoToLogin,onGoToRegister}){
      
    return <>
        <section className="landing">
            <div className="landing__container">
                <div className="landing__logo">
                    <img src="img/logo.svg" className="landing__logo-item" />
                </div>
                <div className="landing__info">The best soocer app to keep players up to date. Send direct messages to them, add to you favorites and vote the best of the week, the possibilities are unlimited!
          </div>
                <div className="landing__nav">
                    <button className="landing__button" onClick={onGoToLogin}>LOGIN</button>
                    <button className="landing__button" onClick={onGoToRegister}>REGISTER</button>
                </div>
            </div>
        </section>
    </>
}

function Landing({ toRegister, toLogin }) {
    return <>
        <nav className="nav">
            <a href="" className="nav__item nav__item--contrast register-link" onClick={toRegister} >Register</a>
            <a href="" className="nav__item login-link" onClick={toLogin}>Login</a>
        </nav>

        <section className="brand">
            <h1 className="brand__title">Cryptonite</h1>
            <h4 className="brand__description">Track your coins the simplest way as never before.
            Just the news you need. Made for hodlers by hodlers. Join Cryptonite!</h4>
        </section>

        <footer className="footer">
            <section>
                <p className="footer__text">Not a Cryptoniter already?</p>
                <a href="" className="footer__button footer__button--contrast" onClick={toRegister}>Register</a>
                <a href="" className="footer__button" onClick={toLogin}>Login</a>
                <p className="footer__copyright">© 2020 Team Jalapeño - Skylab Coders. All rights reserved.</p>
            </section>

        </footer>
    </>
}
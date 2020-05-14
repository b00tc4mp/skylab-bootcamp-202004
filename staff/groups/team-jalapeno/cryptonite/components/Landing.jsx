const { useEffect, useState } = React

function Landing({ toRegister, toLogin, handleGoToLoginFromLanding }) {

    const [cryptos, setCryptos] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        handleRetrieveCryptos()
    }, [])


    const handleSearchOnChange = (event) => {
        const {
            target: { value: query },
        } = event;

        try {
            if (!query) return handleRetrieveCryptos();
            searchCryptos(query, (_error, _cryptos) => {
                if (_error) setError(_error.message);
                else setCryptos(_cryptos);
            })     
        } catch (_error) {
            setError(_error.message)
        }  
    }

    const handleRetrieveCryptos = () => {

        try {
            retrieveCryptos((_error, _cryptos) => {
                if (_error) setError(_error.message);
                else setCryptos(_cryptos);
            })  
        } catch (_error) {
            setError(_error.message)
        }
    }

    return <>
        <nav className="nav">
            <a href="" className="nav__item nav__item--contrast register-link" onClick={toRegister} >Register</a>
            <a href="" className="nav__item login-link" onClick={handleGoToLoginFromLanding}>Login</a>
        </nav>

        <section className="brand">
            <h1 className="brand__title">Cryptonite</h1>
            <h4 className="brand__description">Track your coins the simplest way. Control your portfolio as never before. Made for hodlers by hodlers. Join Cryptonite!</h4>
        </section>

        {cryptos && (
            <Cryptos
                handleSearchOnChange={handleSearchOnChange}
                cryptoResults={cryptos}
                handleClickCoin={toLogin}
            />
        )}

        <footer className="footer">
            <section>
                <p className="footer__text">Not a Cryptoniter already?</p>
                <div>
                    <a href="" className="footer__button footer__button--contrast" onClick={toRegister}>Register</a>
                    <a href="" className="footer__button" onClick={toLogin}>Login</a>
                </div>
                <p className="footer__copyright">© 2020 Team Jalapeño - Skylab Coders. All rights reserved.</p>
            </section>

        </footer>
    </>
} ''
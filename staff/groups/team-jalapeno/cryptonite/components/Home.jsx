const { useEffect, useState } = React

function Home() {
    const [cryptos, setCryptos] = useState(null)
    const [error, setError] = useState(null)


    useEffect(()=>{
        retrieveCryptos((_error, _cryptos)=> {
            if (_error)  setError(_error.messsage)  
            else setCryptos(_cryptos) 
            console.log('i just set Cryptos')
        })
        
    }, [])

    return <>
        <nav className="nav">
            <a href="" className="nav__item nav__item--contrast register-link"></a>
            <a href="" className="nav__item logout-link">Logout</a>
        </nav>

        <section className="portfolio">
            <h3 className="portfolio__title">Wallet</h3>
            <h1 className="portfolio__money">1.752,21$</h1>
            <h4 className="portfolio__stats"><span className="portfolio__stats--contrast">+121,40$ (8.3%)</span> Last 24h</h4>
            <button className="portfolio__button">Go to Portfolio </button>
        </section>

        {cryptos &&<Cryptos cryptoResults={cryptos} />}


        <footer className="footer">
            <section>
                <p className="footer__copyright">© 2020 Team Jalapeño - Skylab Coders. All rights reserved.</p>
            </section>

        </footer>
        
    </>
}
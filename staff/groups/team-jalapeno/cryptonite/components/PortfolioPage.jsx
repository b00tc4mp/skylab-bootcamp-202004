function PortfolioPage() {


    return <div>
        <nav className="nav">
            <a href className="nav__item logout-link">Logout</a>
        </nav>
        <section className="portfolio">
            <h1 className="portfolio__money">1.752,21$</h1>
            <h4 className="portfolio__stats"><span className="portfolio__stats--contrast">+121,40$ (8.3%)</span> Last 24h</h4>
        </section>
        <section className="crypto-coins">
            <h3 className="crypto-coins__title">My Portfolio</h3>
            <section className="coins-container">
                {/* THIS NEEDS TO BE MAPPED */}
                <div className="wallet">
                    <div className="wallet__head">
                        <span className="coin__title">BTC</span>
                        <span className="coin__name">Bitcoin</span>
                    </div>
                    <div className="wallet__body">
                        <span className="coin__price coin__price--light">4.32 BTC</span>
                        <span className="coin__percentage">(38.019$)</span>
                    </div>
                </div>
                {/* UP TO HERE */}
            </section>
        </section>
        <footer className="footer">
            <section>
                <p className="footer__copyright">© 2020 Team Jalapeño - Skylab Coders. All rights reserved.</p>
            </section>
        </footer>
    </div>
}
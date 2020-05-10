function FavoritesPage() {


    return <div>
        <nav className="nav">
            <a href className="nav__item logout-link">Logout</a>
        </nav>
        <section className="brand">
            <h1 className="brand__title">Favorites</h1>
            <h4 className="brand__description">Track all your crypto favorites!</h4>
        </section>
        <section className="crypto-coins">
            <h3 className="crypto-coins__title">Crypto Favorites</h3>
            <section className="coins-container">
                {/* THIS NEEDS TO BE MAPED */}
                <div className="coin coin--large">
                    <div className="coin__head">
                        <span className="coin__symbol">BTC</span>
                        <span className="coin__rank">12</span>
                    </div>
                    <div className="coin__body">
                        <span className="coin__name">Bitcoin</span>
                        <span className="coin__price">4.00751 BTC</span>
                        <span className="coin__percentage">+120$ (14%)</span>
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
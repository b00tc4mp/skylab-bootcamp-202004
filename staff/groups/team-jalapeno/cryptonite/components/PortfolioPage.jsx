function PortfolioPage({ onLogout }) {
    const [coinCryptos, setCoinCryptos] = useState(null)
    const [error, setError] = useState(null)
    const [portfolio, setPortfolio] = useState(null)
    const [wallet, setWallet] = useState(0)


    useEffect(() => {


        retrieveUser(sessionStorage.token, (userError, user) => {
            if (userError) return setError(userError)

            const { portfolio } = user
            setPortfolio(portfolio)

            const ids = portfolio.map(item => item.id)


            if (portfolio.length) {

                retrieveFavorites((cryptosError, data) => {
                    if (cryptosError) return setError(cryptosError)

                    const _data = data.map(coin => {
                        const thisCoin = portfolio.find(item => {
                            return coin.id === item.id
                        })

                        coin.quantity = thisCoin.quantity
                        return coin
                    })

                    const total = _data.reduce((acc, { quantity, priceUsd }) => {
                        return acc + subTotal(quantity, priceUsd) * 1
                    }, 0).toFixed(2)

                    setWallet(total)
                    setCoinCryptos(_data)
                }, ids)
            }
        })

    }, [])

    const subTotal = (quantity, priceUsd) => {
        const result = Number(quantity) * Number(priceUsd)
        return result.toFixed(2)
    }




    return <div>
        <nav className="nav">
            <a href='#' className="nav__item logout-link" onClick={onLogout} >Logout</a>
        </nav>
        <section className="portfolio">
            <h3 className="crypto-coins__title">Wallet</h3>
            <h1 className="portfolio__money">{wallet}$</h1>
            {/* <h4 className="portfolio__stats"><span className="portfolio__stats--contrast">+121,40$ (8.3%)</span> Last 24h</h4> */}

        </section>
        <section className="crypto-coins">
            <h3 className="crypto-coins__title">My Portfolio</h3>
            <section className="coins-container">

                {coinCryptos && coinCryptos.map(({ symbol, name, priceUsd, quantity }) => (

                    <div className="wallet" key={symbol}>
                        <div className="wallet__head">
                            <span className="coin__title" >{symbol}</span>
                            <span className="coin__name">{name}</span>
                        </div>
                        <div className="wallet__body">
                            <span className="coin__price coin__price--light">{quantity} {symbol}</span>
                            <span className="coin__percentage">({subTotal(quantity, priceUsd)}$)</span>
                        </div>
                    </div>


                ))}
                {!coinCryptos && <h4 className="brand__description">You don't have coins in portfolio... :( </h4>}
            </section>
        </section>
    </div >
}
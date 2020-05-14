const { useEffect, useState } = React;

function CoinPage({ addPortfolioSubmit }) {
    const [crypto, setCrypto] = useState(null)
    const [error, setError] = useState(null)
    const [ohlc, setOhlc] = useState(null)
    const [isFav, setIsFav] = useState(false)
    const [inPortfolio, setInPortfolio] = useState(false)


    useEffect(() => {
        let coinName = window.location.hash
        if (!coinName) return

        coinName = coinName.substring(1)

        retrieveCrypto(coinName, (_error, _crypto) => {
            if (_error) setError(_error.message);
            setCrypto(_crypto);
            checkFavorite(_crypto.id)
        });


        retrieveOhlc(coinName, (_error, _data) => {
            if (_error) setError(_error.message);
            else setOhlc(_data);
        })


    }, [])

    useEffect(() => {
        if (crypto) {
            getPortfolioCoin()
        }
    }, [crypto])

    const checkFavorite = (cryptoId) => {
        retrieveUser(sessionStorage.token, (_error, _user) => {
            if (_error) setError(_error.message);
            const { favorites } = _user
            setIsFav(favorites.includes(cryptoId || crypto.id))
        });

    }

    const handleToggleFav = () => {
        toggleFavorite(sessionStorage.token, crypto.id, (_error) => {
            if (_error) setError(_error.message);
            checkFavorite()
        })
    }

    const addSubmit = (event) => {
        event.preventDefault()

        let quantity = event.target.quantity.value;
        quantity = Number(quantity)
        event.target.quantity.value = ''

        addPortfolioSubmit(crypto.id, quantity, (_error) => {
            if (_error) setError(_error.message);
            getPortfolioCoin()
        })

    }

    const getPortfolioCoin = () => {
        retrieveUser(sessionStorage.token, (_error, user) => {
            if (_error) setError(_error.message);

            const portfolioCoin = user.portfolio.find(coin => crypto.id === coin.id)
            if (portfolioCoin) {
                setInPortfolio(`${portfolioCoin.quantity} ${crypto.symbol}`)
            } else setInPortfolio('')
        })
    }

    const handleDeleteFromPortfolio = (event) => {
        deletePortfolioCrypto(sessionStorage.token, crypto.id, (_error) => {
            if (_error) setError(_error.message);
            getPortfolioCoin()
        })

    }


    return <>

        {crypto && <div>
            <section className="coinpage-header">
                <nav className="nav">
                    <a href='#' className="nav__item logout-link">Logout</a>
                </nav>
                <section className="portfolio">
                    <h1 className="coinpage-header__name">{crypto.name}</h1>
                    {inPortfolio && <h4 className="portfolio__stats">In Portfolio: {inPortfolio}</h4>}
                    {ohlc && <div className="coinpage-header__stats">
                        <span className="coinpage-header__stats--contrast">Open: {Number(ohlc.open).toFixed(3)}$</span>
                        <span className="coinpage-header__stats--contrast">High: {Number(ohlc.high).toFixed(3)}$</span>
                        <span className="coinpage-header__stats--contrast">Low: {Number(ohlc.low).toFixed(3)}$</span>
                        <span className="coinpage-header__stats--contrast">Close: {Number(ohlc.close).toFixed(3)}$</span>
                    </div>}
                    {!ohlc && <p>OHCL Data is not avaliable for this coin.</p>}
                    <button onClick={handleToggleFav} className="coinpage-header__button">{isFav ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                    <form action="" name="add-portfolio" className="portfolio__input" onSubmit={addSubmit} >
                        <input type="text" name="quantity" id="" placeholder="Quantity" />
                        <button className="coinpage-header__button" type="submit">Add to Portfolio <i className="fa fa-bitcoin"></i></button>
                        <button onClick={handleDeleteFromPortfolio} className="coinpage-header__button" type="button">Delete From Portfolio <i className="fa fa-bitcoin"></i></button>


                    </form>
                </section>
            </section>
            {/* TradingView Widget BEGIN */}
            <div className="tradingview-widget-container">
                <div id="tradingview_7e118" />
                <div className="tradingview-widget-copyright">
                    <a href={`https://www.tradingview.com/symbols/${crypto.symbol}/USD/`} rel="noopener" target="_blank">
                        <span className="blue-text">BTCUSD Chart</span></a> by Team Jalapeño</div>
            </div>
            {/* TradingView Widget END */}
        </div>
        }

        {!crypto && !error && <p>Loading...</p>}
        {error && <p>{error}</p>}

    </>
} 
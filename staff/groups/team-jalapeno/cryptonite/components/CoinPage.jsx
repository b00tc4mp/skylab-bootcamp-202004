const { useEffect, useState } = React;

function CoinPage() {
    const [crypto, setCrypto] = useState(null)
    const [error, setError] = useState(null)
    const [ohlc, setOhlc] = useState(null)


    useEffect(() => {
        let coinName = window.location.hash
        if (!coinName) return

        coinName = coinName.substring(1)

        retrieveCrypto(coinName, (_error, _crypto) => {
            if (_error) setError(_error.message);
            setCrypto(_crypto);
        });

        retrieveOhlc(coinName, (_error, _data) => {
            if (_error) setError(_error.message);
            else setOhlc(_data);
        })
    }, [])



    return <>

        {crypto && <div>
            <section className="coinpage-header">
                {/* COMPO 1 */}
                <nav className="nav">
                    {/* <a href="" class="nav__item nav__item--contrast register-link"></a> */}
                    <a href='#' className="nav__item logout-link">Logout</a>
                </nav>
                {/* COMPO 2 */}
                <section className="portfolio">
                    <h1 className="coinpage-header__name">{crypto.name}</h1>
                    {ohlc && <div className="coinpage-header__stats">
                        <span className="coinpage-header__stats--contrast">{ohlc.open}</span>
                        <span className="coinpage-header__stats--contrast">{ohlc.high}</span>
                        <span className="coinpage-header__stats--contrast">{ohlc.low}</span>
                        <span className="coinpage-header__stats--contrast">{ohlc.close}</span>
                    </div>}
                    {!ohlc && <p>Loading...</p>}
                    <button className="coinpage-header__button">Add to Favorites</button>
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
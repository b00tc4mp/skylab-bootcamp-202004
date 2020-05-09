
function CoinPage({ name, symbol }) {


    return <div>
        <section className="coinpage-header">
            {/* COMPO 1 */}
            <nav className="nav">
                {/* <a href="" class="nav__item nav__item--contrast register-link"></a> */}
                <a href className="nav__item logout-link">Logout</a>
            </nav>
            {/* COMPO 2 */}
            <section className="portfolio">
                <h1 className="coinpage-header__name">{name}</h1>
                <div className="coinpage-header__stats">
                    <span className="coinpage-header__stats--contrast">Open: 13,2$</span>
                    <span className="coinpage-header__stats--contrast">High: 14,32$</span>
                    <span className="coinpage-header__stats--contrast">Low: 10,1$</span>
                    <span className="coinpage-header__stats--contrast">Close: 13,5$</span>
                </div>
                <button className="coinpage-header__button">Add to Favorites</button>
            </section>
        </section>
        {/* TradingView Widget BEGIN */}
        <div className="tradingview-widget-container">
            <div id="tradingview_7e118" />
            <div className="tradingview-widget-copyright"><a href={`https://www.tradingview.com/symbols/${symbol}USD/`} rel="noopener" target="_blank"><span className="blue-text">BTCUSD Chart</span></a> by Team Jalapeño</div>
        </div>
        {/* TradingView Widget END */}
    </div>

}
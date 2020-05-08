const { useState , useEffect} = React

function Cryptos({cryptoResults}){

    const getChangePrice24Hr = (price, changePercent) => {
        let result = (price * (1 - (changePercent / 100)).toFixed(3))
        result > 0 ? result = '+' + result : result.toString()
        return result
    }

    return(
        <section className="crypto-coins">
            <h3 className="crypto-coins__title">Crypto Coins</h3>
            <section className="crypto-coins__search">
                <input type="text" placeholder="Find your next crypto favorite" />
                <i className="fa fa-search " />
            </section>
            <section className='crypto-container'>

            {!cryptoResults && <p>Loading...</p>}
            {cryptoResults && cryptoResults.map(({name, symbol, rank, priceUsd, changePercent24Hr}) => {

                {priceUsd = Number(priceUsd)
                    priceUsd = priceUsd.toFixed(3).toString(); 
                    changePercent24Hr = Number(changePercent24Hr);
                    changePercent24Hr = changePercent24Hr.toFixed(3).toString()}


                return <div className="coin">
                    <div className="coin__head">
                        <span className="coin__symbol">{symbol}</span>
                        <span className="coin__rank">{rank}</span>
                    </div>
                    <div className="coin__body">
                        <span className="coin__name">{name}</span>
                        <span className="coin__price">{priceUsd} USD</span>
                        <span className="coin__percentage">{getChangePrice24Hr(priceUsd, changePercent24Hr)}$ ({changePercent24Hr}%)</span>
                    </div>
                </div>  
            })}
        
            </section>
        </section>
    )
}
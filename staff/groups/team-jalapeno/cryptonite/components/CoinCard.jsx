function CoinCard({ id, rank, symbol, name, priceUsd, changePercent24Hr, handleClickCoin }) {

    const getChangePrice24Hr = (price, changePercent) => {
        let result = (price / 100 * changePercent)
        result = result.toFixed(2)
        result > 0 ? result = '+' + result : result.toString()
        return result
    }

    return <div className="coin" onClick={() => handleClickCoin(id)} >
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
}         
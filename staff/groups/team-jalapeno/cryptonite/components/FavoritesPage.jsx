const { useEffect, useState } = React

function FavoritesPage({ handleClickCoin, onLogout }) {

    const [coinFavs, setCoinFavs] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {

        try {
            retrieveUser(sessionStorage.token, (userError, user) => {
                if (userError) return setError(userError)
    
                const { favorites } = user
                
                if (favorites.length) {
    
                    retrieveFavorites((cryptosError, data) => {
                        if (cryptosError) return setError(cryptosError)
                        setCoinFavs(data)
                    }, favorites)
                }
            })  
        } catch (_error) {
            setError(_error.message)
        }
    }, [])

    const getChangePrice24Hr = (price, changePercent) => {
        let result = (price / 100 * changePercent)
        result = result.toFixed(2)
        result > 0 ? result = '+' + result : result.toString()
        return result
    }


    return <div>
        <nav className="nav">
            <a href='#' className="nav__item logout-link" onClick={onLogout}>Logout</a>
        </nav>
        <section className="brand">
            <h1 className="brand__title">Favorites</h1>
            <h4 className="brand__description">Track all your crypto favorites!</h4>
        </section>
        <section className="crypto-coins">
            <h3 className="crypto-coins__title">Crypto Favorites</h3>
            <section className="coins-container">
                {coinFavs && coinFavs.map(({ symbol, id, rank, name, priceUsd, changePercent24Hr }) => (
                    <div className="coin coin--large" key={id} onClick={() => handleClickCoin(id)} >
                        <div className="coin__head">
                            <span className="coin__symbol">{symbol}</span>
                            <span className="coin__rank">{rank}</span>
                        </div>
                        <div className="coin__body">
                            <span className="coin__name">{name}</span>
                            <span className="coin__price">{Number(priceUsd).toFixed(2)}</span>
                            <span className="coin__percentage">{getChangePrice24Hr(priceUsd, changePercent24Hr)}$ ({Number(changePercent24Hr).toFixed(2)}%)</span>
                        </div>
                    </div>

                ))}
                {!coinFavs && <h4 className="brand__description">You don't have any favorites... :( </h4>}
            </section>
        </section>
    </div>

}
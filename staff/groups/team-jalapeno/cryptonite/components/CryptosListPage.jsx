function CryptosListPage({ handleSearchOnChange, cryptos, handleClickCoin, handlePortfolioClick }) {
  const [error, setError] = useState(null)
  const [wallet, setWallet] = useState(0)


  useEffect(() => {

    retrieveUser(sessionStorage.token, (userError, user) => {
      if (userError) return setError(userError)

      const { portfolio } = user

      const ids = []
      for (let i = 0; i < portfolio.length; i++) ids.push(portfolio[i].id)

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

          let result = 0
          for (let i = 0; i < _data.length; i++) {
            let { quantity, priceUsd } = _data[i]
            result += subTotal(quantity, priceUsd) * 1
          }
          result = result.toFixed(2)
          setWallet(result)
        }, ids)
      }
    })

  }, [])

  const subTotal = (quantity, priceUsd) => {
    let result = Number(quantity) * Number(priceUsd)
    return result.toFixed(2)
  }




  return (
    <>
      <section className="portfolio">
        <h3 className="portfolio__title">Wallet</h3>
        <h1 className="portfolio__money">{wallet}$</h1>
        <h4 className="portfolio__stats">
          <span className="portfolio__stats--contrast">+121,40$ (8.3%)</span>{" "}
          Last 24h
        </h4>
        <button className="portfolio__button" onClick={handlePortfolioClick}>Go to Portfolio </button>
      </section>

      {cryptos && (
        <Cryptos
          handleSearchOnChange={handleSearchOnChange}
          cryptoResults={cryptos}
          handleClickCoin={handleClickCoin}
        />
      )}
    </>
  );
}

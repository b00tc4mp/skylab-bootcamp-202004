function CryptosListPage({ handleSearchOnChange, cryptos, handleClickCoin, handlePortfolioClick }) {
  const [error, setError] = useState(null)
  const [wallet, setWallet] = useState(0)


  useEffect(() => {

    retrieveUser(sessionStorage.token, (userError, user) => {
      if (userError) return setError(userError)

      const { portfolio } = user

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
        }, ids)
      }
    })

  }, [])

  const subTotal = (quantity, priceUsd) => {
    const result = Number(quantity) * Number(priceUsd)
    return result.toFixed(2)
  }




  return (
    <>
      <section className="portfolio">
        <h3 className="portfolio__title">Wallet</h3>
        <h1 className="portfolio__money">{wallet}$</h1>
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

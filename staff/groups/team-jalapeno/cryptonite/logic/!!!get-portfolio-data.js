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
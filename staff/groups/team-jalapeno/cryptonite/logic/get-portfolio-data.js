retrieveUser(sessionStorage.token, (userError, user) => {
    if (userError) return setError(userError)

    const { portfolio } = user
    setPortfolio(portfolio)

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
            setWallet(result)
            setCoinCryptos(_data)
        }, ids)
    }
})
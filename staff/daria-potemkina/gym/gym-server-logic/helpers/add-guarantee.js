module.exports = (contracts) => {

    const GUARANTEE = 0.1

        let nominal = 0

        if (!contracts.length) return nominal

        for (let item in contracts) {
            nominal += contracts[item].trades.reduce((accum, trade) => accum + trade.quantity, 0) * contracts[item].product.contractSize
        }
        return (nominal * GUARANTEE).toFixed(2) * 1
}


require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongoose, models: { Product, Option, Underlying } } = require('gym-data')

mongoose.connect('mongodb://localhost:27017/gym-api-test')
// const future1 = new Product({
//     productType: 'future',
//     ticker: "BBVA",
//     exchange: 'MEFF',
//     sector: 'Banking',
//     contractSize: 100,
//     settlementDate: new Date('June 19, 2020 17:45:00')
// })

// future1.save()

const future2 = new Product({
    productType: 'future',
    ticker: "IBE",
    exchange: "MEFF",
    sector: 'Utilities',
    contractSize: 100,
    settlementDate: new Date('June 22, 2020 17:30:00')
})

future2.save()

// const product1 = new Product({
//     productType: 'option',
//     exchange: "MEFF",
//     ticker: "ITX",
//     sector: 'Consumer',
//     contractSize: 100,
//     settlementDate: new Date('June 19, 2020 17:30:00')
// })

// const option1 = new Option({
//     side: "call",
//     strike: 27
// })

// product1.type = option1

// product1.save()

// const product2 = new Product({
//     productType: 'option',
//     exchange: "MEFF",
//     ticker: "ITX",
//     sector: 'Consumer',
//     contractSize: 100,
//     settlementDate: new Date('June 19, 2020 17:30:00')
// })

// const option2 = new Option({
//     side: "call",
//     strike: 29
// })

// product2.type = option2

// product2.save()

// const bbvaUnderlying = new Underlying({
//     ticker: 'BBVA'
// })

// bbvaUnderlying.save()

const ibeUnderlying = new Underlying({
    ticker: 'IBE'
})

ibeUnderlying.save()

// const itxUnderlying = new Underlying({
//     ticker: 'ITX'
// })

// itxUnderlying.save()

.then(mongoose.disconnect)






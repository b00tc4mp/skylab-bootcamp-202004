require('dotenv').config()

const { mongoose, models: { Product, Option, Underlying } } = require('gym-data')

mongoose.connect('mongodb://localhost:27017/gym-api')

// const future1 = new Product({
//     productType: 'future',
//     ticker: "BBVA",
//     exchange: 'MEFF',
//     sector: 'Banking',
//     contractSize: 100,
//     settlementDate: new Date('June 24, 2020 12:45:00')
// })

// future1.save()

const future2 = new Product({
    productType: 'future',
    ticker: "IBE",
    exchange: "MEFF",
    sector: 'Utilities',
    contractSize: 100,
    settlementDate: new Date('June 24, 2020 23:59:00')
})

future2.save()

// const future3 = new Product({
//     productType: 'future',
//     ticker: "BBVA",
//     exchange: 'MEFF',
//     sector: 'Banking',
//     contractSize: 100,
//     settlementDate: new Date('September 18, 2020 17:45:00')
// })

// future3.save()

// const future4 = new Product({
//     productType: 'future',
//     ticker: "IBE",
//     exchange: "MEFF",
//     sector: 'Utilities',
//     contractSize: 100,
//     settlementDate: new Date('September 25, 2020 17:30:00')
// })

// future4.save()

// const future5 = new Product({
//     productType: 'future',
//     ticker: "AENA",
//     exchange: "MEFF",
//     sector: 'Industrials',
//     contractSize: 100,
//     settlementDate: new Date('September 18, 2020 17:30:00')
// })

// future5.save()

// const future6 = new Product({
//     productType: 'future',
//     ticker: "ITX",
//     exchange: "MEFF",
//     sector: 'Consumer',
//     contractSize: 100,
//     settlementDate: new Date('December 18, 2020 17:30:00')
// })

// future6.save()


// const future7 = new Product({
//     productType: 'future',
//     ticker: "ADSG",
//     exchange: "EUREX",
//     sector: 'Consumer',
//     contractSize: 100,
//     settlementDate: new Date('December 18, 2020 17:30:00')
// })

// future7.save()

// const future8 = new Product({
//     productType: 'future',
//     ticker: "DBKI",
//     exchange: "EUREX",
//     sector: 'Banking',
//     contractSize: 100,
//     settlementDate: new Date('Septiember 18, 2020 17:30:00')
// })

// future8.save()


// const product1 = new Product({
//     productType: 'option',
//     exchange: "MEFF",
//     ticker: "ITX",
//     sector: 'Consumer',
//     contractSize: 100,
//     settlementDate: new Date('September 25, 2020 17:30:00')
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
//     settlementDate: new Date('September 19, 2020 17:30:00')
// })

// const option2 = new Option({
//     side: "call",
//     strike: 29
// })

// product2.type = option2

// product2.save()

// const product3= new Product({
//     productType: 'option',
//     exchange: "EUREX",
//     ticker: "HNK",
//     sector: 'Consumer',
//     contractSize: 100,
//     settlementDate: new Date('September 19, 2020 17:30:00')
// })

// const option3 = new Option({
//     side: "put",
//     strike: 98
// })

// product3.type = option3

// product3.save()

// const product4= new Product({
//     productType: 'option',
//     exchange: "EUREX",
//     ticker: "HNK",
//     sector: 'Consumer',
//     contractSize: 100,
//     settlementDate: new Date('June 22, 2020 17:30:00')
// })

// const option4 = new Option({
//     side: "put",
//     strike: 95
// })

// product4.type = option4

// product4.save()

// const bbvaUnderlying = new Underlying({
//     ticker: 'BBVA'
// })

// bbvaUnderlying.save()

// const ibeUnderlying = new Underlying({
//     ticker: 'IBE'
// })

// ibeUnderlying.save()

// const itxUnderlying = new Underlying({
//     ticker: 'ITX'
// })

// itxUnderlying.save()

// const aenaUnderlying = new Underlying({
//     ticker: 'AENA'
// })

// aenaUnderlying.save()

// const adsgUnderlying = new Underlying({
//     ticker: 'ADSG'
// })

// adsgUnderlying.save()

// const dbkiUnderlying = new Underlying({
//     ticker: 'DBKI'
// })

// dbkiUnderlying.save()

// const hnkUnderlying = new Underlying({
//     ticker: 'HNK'
// })

// hnkUnderlying.save()

.then(mongoose.disconnect)






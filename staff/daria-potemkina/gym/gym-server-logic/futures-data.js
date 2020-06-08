require('dotenv').config()
const moment = require('moment')

const { env: { MONGODB_URL } } = process
const { mongoose, models: { Future } } = require('gym-data')

const futures = [{
    type: "FT",
    exchange: "MEFF",
    ticker: "BBVA",
    sector: 'Banking',
    contractSize: 100,
    features: [{
        expirationDate: new Date('Juny 19, 2020 17:45:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 3.51
        },
        {
            date: new Date('June 04, 2020'),
            price: 3.50
        }]
    }]
},

{
    type: "FT",
    exchange: "MEFF",
    ticker: "IBE",
    sector: 'Utilities',
    contractSize: 100,
    features: [{
        expirationDate: new Date('June 19, 2020 17:30:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 9.95
        },
        {
            date: new Date('June 04, 2020'),
            price: 9.90
        }]
    }]
}
,
{
    type: "FT",
    exchange: "MEFF",
    ticker: "AENA",
    sector: 'Industrials',
    contractSize: 100,
    features: [{
        expirationDate: new Date('June 19, 2020 17:30:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 140.33
        },
        {
            date: new Date('June 04, 2020'),
            price: 141.00
        }]
    }]
},
{
    type: "FT",
    exchange: "MEFF",
    ticker: "miniIBEX",
    sector: 'All',
    contractSize: 1,
    features: [{
        expirationDate: new Date('June 19, 2020 17:30:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 7810
        },
        {
            date: new Date('June 04, 2020'),
            price: 7811
        }]
    },
    {
        expirationDate: new Date('July 17, 2020 17:30:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 7760
        },
        {
            date: new Date('June 04, 2020'),
            price: 7758
        }]
    },
    {
        expirationDate: new Date('August 21, 2020 17:30:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 7655
        },
        {
            date: new Date('June 04, 2020'),
            price: 7650
        }]
    }]
},

{
    type: "FT",
    exchange: "MEFF",
    ticker: "ITX",
    sector: 'Consumer',
    contractSize: 100,
    features: [{
        expirationDate: new Date('June 19, 2020 17:30:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 26.80
        },
        {
            date: new Date('June 04, 2020'),
            price: 26
        }]
    }]
},

{
    type: "FT",
    exchange: "EUREX",
    ticker: "DBKI",
    sector: 'Banking',
    contractSize: 100,
    features: [{
        expirationDate: new Date('June 19, 2020 17:45:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 8.71
        },
        {
            date: new Date('June 05, 2020'),
            price: 8.65
        }]
    },
    {
        expirationDate: new Date('September 18, 2020 17:45:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 8.70
        },
        {
            date: new Date('June 05, 2020'),
            price: 8.60
        }]

    }]
},

{
    type: "FT",
    exchange: "EUREX",
    ticker: "GANG",
    sector: 'Utility',
    contractSize: 100,
    features: [{
        expirationDate: new Date('Juny 19, 2020 17:45:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 17.39
        },
        {
            date: new Date('June 04, 2020'),
            price: 17.50
        }]
    },
    {
        expirationDate: new Date('September 18, 2020 17:45:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 17.17
        },
        {
            date: new Date('June 04, 2020'),
            price: 17.20
        }]
    }]
},

{
    type: "FT",
    exchange: "EUREX",
    ticker: "GANG",
    sector: 'Industrials',
    contractSize: 100,
    features: [{
        expirationDate: new Date('Juny 19, 2020 17:45:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 108.42
        },
        {
            date: new Date('June 04, 2020'),
            price: 108.00
        }]
    },
    {
        expirationDate: new Date('September 18, 2020 17:45:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 108.52
        },
        {
            date: new Date('June 04, 2020'),
            price: 108.70
        }]

    }]
},

{
    type: "FT",
    exchange: "EUREX",
    ticker: "ADSG",
    sector: 'Consumer',
    contractSize: 100,
    features: [{
        expirationDate: new Date('Juny 19, 2020 17:45:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 264.44
        },
        {
            date: new Date('June 04, 2020'),
            price: 266.00
        }]
    },
    {
        expirationDate: new Date('September 18, 2020 17:45:00'),
        prices: [{
            date: new Date('June 05, 2020'),
            price: 263.91
        },
        {
            date: new Date('June 04, 2020'),
            price: 263.91
        }]

    }]
}
]

mongoose.connect(MONGODB_URL)
    Future.create(futures)
    .then(mongoose.disconnect)




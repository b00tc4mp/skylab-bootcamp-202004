require('dotenv').config()
const moment = require('moment')

const { env: { MONGODB_URL } } = process
const { mongoose, models: { Option } } = require('gym-data')

const options = [
    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "call",
        expirationDate: new Date('June 19, 2020 17:30:00'),
        strike: 27,
        prices: [{
            date: new Date(),
            price: 0.71
        }]
    },


    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "call",
        expirationDate: new Date('June 19, 2020 17:30:00'),
        strike: 29,
        prices: [{
            date: new Date(),
            price: 0.17
        }]
    },

    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "put",
        expirationDate: new Date('June 19, 2020 17:30:00'),
        strike: 22,
        prices: [{
            date: new Date(),
            price: 0.07
        }]
    },

    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "put",
        expirationDate: new Date('June 19, 2020 17:30:00'),
        strike: 25,
        prices: [{
            date: new Date(),
            price: 0.30
        }]
    },

    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "put",
        expirationDate: new Date('June 19, 2020 17:30:00'),
        strike: 27,
        prices: [{
            date: new Date(),
            price: 1.10
        }]
    },

    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "call",
        expirationDate: new Date('July 17, 2020 17:30:00'),
        strike: 27,
        prices: [{
            date: new Date(),
            price: 1.30
        }]
    },

    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "call",
        expirationDate: new Date('July 17, 2020 17:30:00'),
        strike: 28,
        prices: [{
            date: new Date(),
            price: 0.70
        }]
    },
    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "call",
        expirationDate: new Date('July 17, 2020 17:30:00'),
        strike: 29,
        prices: [{
            date: new Date(),
            price: 0.44
        }]
    },

    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "put",
        expirationDate: new Date('July 17, 2020 17:30:00'),
        strike: 24,
        prices: [{
            date: new Date(),
            price: 0.45
        }]
    },

    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "put",
        expirationDate: new Date('July 17, 2020 17:30:00'),
        strike: 25,
        prices: [{
            date: new Date(),
            price: 0.60
        }]
    },
    {
        type: "OPT",
        exchange: "MEFF",
        ticker: "ITX",
        underlying: "Inditex",
        sector: 'Consumer',
        contractSize: 100,
        side: "put",
        expirationDate: new Date('July 17, 2020 17:30:00'),
        strike: 26,
        prices: [{
            date: new Date(),
            price: 0.90
        }]
    },

    {
        type: "OPT",
        exchange: "EUREX",
        ticker: "HNK",
        underlying: "Heineken",
        sector: 'Consumer',
        contractSize: 100,
        side: "call",
        expirationDate: new Date('June 19, 2020 17:30:00'),
        strike: 98,
        prices: [{
            date: new Date(),
            price: 0.02
        }]
    },

    {
        type: "OPT",
        exchange: "EUREX",
        ticker: "HNK",
        underlying: "Heineken",
        sector: 'Consumer',
        contractSize: 100,
        side: "call",
        expirationDate: new Date('June 19, 2020 17:30:00'),
        strike: 95,
        prices: [{
            date: new Date(),
            price: 0.05
        }]
    },
    {
        type: "OPT",
        exchange: "EUREX",
        ticker: "HNK",
        underlying: "Heineken",
        sector: 'Consumer',
        contractSize: 100,
        side: "call",
        expirationDate: new Date('June 19, 2020 17:30:00'),
        strike: 89,
        prices: [{
            date: new Date(),
            price: 0.67
        }]
    },

    {
        type: "OPT",
        exchange: "EUREX",
        ticker: "HNK",
        underlying: "Heineken",
        sector: 'Consumer',
        contractSize: 100,
        side: "put",
        expirationDate: new Date('June 18, 2020 17:30:00'),
        strike: 98,
        prices: [{
            date: new Date(),
            price: 11.43
        }]
    },

    {
        type: "OPT",
        exchange: "EUREX",
        ticker: "HNK",
        underlying: "Heineken",
        sector: 'Consumer',
        contractSize: 100,
        side: "put",
        expirationDate: new Date('June 18, 2020 17:30:00'),
        strike: 95,
        prices: [{
            date: new Date(),
            price: 8.46
        }]
    },

    {
        type: "OPT",
        exchange: "EUREX",
        ticker: "HNK",
        underlying: "Heineken",
        sector: 'Consumer',
        contractSize: 100,
        side: "put",
        expirationDate: new Date('June 18, 2020 17:30:00'),
        strike: 89,
        prices: [{
            date: new Date(),
            price: 3.09
        }]

    }]

mongoose.connect(MONGODB_URL)
Option.create(options)
    .then(mongoose.disconnect)
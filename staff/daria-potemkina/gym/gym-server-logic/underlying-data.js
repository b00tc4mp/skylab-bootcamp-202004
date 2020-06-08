require('dotenv').config()
const moment = require('moment')

const { env: { MONGODB_URL } } = process
const { mongoose, models: { Underlying } } = require('gym-data')

const underlyings = [
    {
        ticker: "DBKI",
        prices: [{
            date: new Date('April 1, 2020'),
            price: 5.67
        },
        {
            date: new Date('April 2, 2020'),
            price: 5.63
        },
        {
            date: new Date('April 3, 2020'),
            price: 5.52
        },
        {
            date: new Date('April 6, 2020'),
            price: 5.68
        },
        {
            date: new Date('April 7, 2020'),
            price: 5.52
        },
        {
            date: new Date('April 8, 2020'),
            price: 6.08
        },
        {
            date: new Date('April 9, 2020'),
            price: 6.15
        },
        {
            date: new Date('April 14, 2020'),
            price: 6.20
        },
        {
            date: new Date('April 15, 2020'),
            price: 6.23
        },
        {
            date: new Date('April 16, 2020'),
            price: 5.73
        },
        {
            date: new Date('April 17, 2020'),
            price: 6.00
        },
        {
            date: new Date('April 20, 2020'),
            price: 5.99
        },
        {
            date: new Date('April 21, 2020'),
            price: 5.78
        },
        {
            date: new Date('April 22, 2020'),
            price: 5.63
        },
        {
            date: new Date('April 23, 2020'),
            price: 5.70
        },
        {
            date: new Date('April 24, 2020'),
            price: 5.63
        },
        {
            date: new Date('April 27, 2020'),
            price: 5.77
        },
        {
            date: new Date('April 28, 2020'),
            price: 6.21
        },
        {
            date: new Date('April 29, 2020'),
            price: 6.30
        },
        {
            date: new Date('April 30, 2020'),
            price: 7.09
        },
        {
            date: new Date('May 4, 2020'),
            price: 6.50
        },
        {
            date: new Date('May 5, 2020'),
            price: 6.61
        },
        {
            date: new Date('May 6, 2020'),
            price: 6.59
        },
        {
            date: new Date('May 7, 2020'),
            price: 6.37
        },
        {
            date: new Date('May 8, 2020'),
            price: 6.63
        },
        {
            date: new Date('May 11, 2020'),
            price: 6.59
        },
        {
            date: new Date('May 12, 2020'),
            price: 6.37
        },
        {
            date: new Date('May 13, 2020'),
            price: 6.33
        },
        {
            date: new Date('May 14, 2020'),
            price: 6.00
        },
        {
            date: new Date('May 15, 2020'),
            price: 6.17
        },
        {
            date: new Date('May 18, 2020'),
            price: 6.05
        },
        {
            date: new Date('May 19, 2020'),
            price: 6.71
        },
        {
            date: new Date('May 20, 2020'),
            price: 6.52
        },
        {
            date: new Date('May 21, 2020'),
            price: 6.74
        },
        {
            date: new Date('May 22, 2020'),
            price: 6.56
        },
        {
            date: new Date('May 25, 2020'),
            price: 6.84
        },
        {
            date: new Date('May 26, 2020'),
            price: 7.00
        },
        {
            date: new Date('May 27, 2020'),
            price: 7.60
        },
        {
            date: new Date('May 28, 2020'),
            price: 7.90
        },
        {
            date: new Date('May 29, 2020'),
            price: 7.58
        },
        {
            date: new Date('June 2, 2020'),
            price: 7.70
        },
        {
            date: new Date('June 3, 2020'),
            price: 8.15
        },
        {
            date: new Date('June 4, 2020'),
            price: 8.08
        },
        {
            date: new Date('June 5, 2020'),
            price: 8.50
        }
    ]
    },
    {
        ticker: "BBVA",
        prices: [{
            date: new Date('April 1, 2020'),
            price: 2.97
        },
        {
            date: new Date('April 2, 2020'),
            price: 2.82
        },
        {
            date: new Date('April 3, 2020'),
            price: 2.92
        },
        {
            date: new Date('April 6, 2020'),
            price: 3.19
        },
        {
            date: new Date('April 7, 2020'),
            price: 3.24
        },
        {
            date: new Date('April 8, 2020'),
            price: 3.15
        },
        {
            date: new Date('April 9, 2020'),
            price: 3.25
        },
        {
            date: new Date('April 13, 2020'),
            price: 3.27
        },
        {
            date: new Date('April 14, 2020'),
            price: 3.26
        },
        {
            date: new Date('April 15, 2020'),
            price: 3.01
        },
        {
            date: new Date('April 16, 2020'),
            price: 2.89
        },
        {
            date: new Date('April 17, 2020'),
            price: 2.89
        },
        {
            date: new Date('April 20, 2020'),
            price: 2.78
        },
        {
            date: new Date('April 21, 2020'),
            price: 2.71
        },
        {
            date: new Date('April 22, 2020'),
            price: 2.76
        },
        {
            date: new Date('April 23, 2020'),
            price: 2.84
        },
        {
            date: new Date('April 24, 2020'),
            price: 2.81
        },
        {
            date: new Date('April 27, 2020'),
            price: 2.81
        },
        {
            date: new Date('April 28, 2020'),
            price: 3.10
        },
        {
            date: new Date('April 29, 2020'),
            price: 3.32
        },
        {
            date: new Date('April 30, 2020'),
            price: 3.17
        },
        {
            date: new Date('May 1, 2020'),
            price: 3.18
        },
        {
            date: new Date('May 4, 2020'),
            price: 3.05
        },
        {
            date: new Date('May 5, 2020'),
            price: 3.02
        },
        {
            date: new Date('May 6, 2020'),
            price: 2.95
        },
        {
            date: new Date('May 7, 2020'),
            price: 2.87
        },
        {
            date: new Date('May 8, 2020'),
            price: 2.93
        },
        {
            date: new Date('May 11, 2020'),
            price: 2.86
        },
        {
            date: new Date('May 12, 2020'),
            price: 2.89
        },
        {
            date: new Date('May 13, 2020'),
            price: 2.80
        },
        {
            date: new Date('May 14, 2020'),
            price: 2.70
        },
        {
            date: new Date('May 15, 2020'),
            price: 2.81
        },
        {
            date: new Date('May 18, 2020'),
            price: 2.90
        },
        {
            date: new Date('May 19, 2020'),
            price: 2.82
        },
        {
            date: new Date('May 20, 2020'),
            price: 2.76
        },
        {
            date: new Date('May 21, 2020'),
            price: 2.82
        },
        {
            date: new Date('May 22, 2020'),
            price: 2.86
        },
        {
            date: new Date('May 26, 2020'),
            price: 3.00
        },
        {
            date: new Date('May 27, 2020'),
            price: 3.23
        },
        {
            date: new Date('May 28, 2020'),
            price: 3.27
        },
        {
            date: new Date('May 29, 2020'),
            price: 3.13
        },
        {
            date: new Date('June 1, 2020'),
            price: 3.10
        },
        {
            date: new Date('June 2, 2020'),
            price: 3.34
        },
        {
            date: new Date('June 3, 2020'),
            price: 3.47
        },
        {
            date: new Date('June 4, 2020'),
            price: 3.59
        },
        {
            date: new Date('June 5, 2020'),
            price: 3.92
        }
    ]
    },
    {
        ticker: "IBE",
        prices: [{
            date: new Date('April 1, 2020'),
            price: 8.75
        },
        {
            date: new Date('April 2, 2020'),
            price: 8.77
        },
        {
            date: new Date('April 3, 2020'),
            price: 8.89
        },
        {
            date: new Date('April 6, 2020'),
            price: 9.19
        },
        {
            date: new Date('April 7, 2020'),
            price: 9.15
        },
        {
            date: new Date('April 8, 2020'),
            price: 8.95
        },
        {
            date: new Date('April 9, 2020'),
            price: 8.93
        },
        {
            date: new Date('April 14, 2020'),
            price: 9.22
        },
        {
            date: new Date('April 15, 2020'),
            price: 9.01
        },
        {
            date: new Date('April 16, 2020'),
            price: 9.03
        },
        {
            date: new Date('April 17, 2020'),
            price: 8.94
        },
        {
            date: new Date('April 20, 2020'),
            price: 9.00
        },
        {
            date: new Date('April 21, 2020'),
            price: 8.90
        },
        {
            date: new Date('April 22, 2020'),
            price: 8.83
        },
        {
            date: new Date('April 23, 2020'),
            price: 8.95
        },
        {
            date: new Date('April 24, 2020'),
            price: 8.70
        },
        {
            date: new Date('April 27, 2020'),
            price: 8.89
        },
        {
            date: new Date('April 28, 2020'),
            price: 8.88
        },
        {
            date: new Date('April 29, 2020'),
            price: 8.91
        },
        {
            date: new Date('April 30, 2020'),
            price: 9.37
        },
        {
            date: new Date('May 4, 2020'),
            price: 8.90
        },
        {
            date: new Date('May 5, 2020'),
            price: 8.97
        },
        {
            date: new Date('May 6, 2020'),
            price: 8.88
        },
        {
            date: new Date('May 7, 2020'),
            price: 8.96
        },
        {
            date: new Date('May 8, 2020'),
            price: 8.85
        },
        {
            date: new Date('May 11, 2020'),
            price: 8.81
        },
        {
            date: new Date('May 12, 2020'),
            price: 8.68
        },
        {
            date: new Date('May 13, 2020'),
            price: 8.60
        },
        {
            date: new Date('May 14, 2020'),
            price: 8.55
        },
        {
            date: new Date('May 15, 2020'),
            price: 8.61
        },
        {
            date: new Date('May 19, 2020'),
            price: 9.06
        },
        {
            date: new Date('May 20, 2020'),
            price: 8.90
        },
        {
            date: new Date('May 21, 2020'),
            price: 8.92
        },
        {
            date: new Date('May 22, 2020'),
            price: 8.82
        },
        {
            date: new Date('May 25, 2020'),
            price: 9.07
        },
        {
            date: new Date('May 26, 2020'),
            price: 9.30
        },
        {
            date: new Date('May 27, 2020'),
            price: 9.22
        },
        {
            date: new Date('May 28, 2020'),
            price: 9.59
        },
        {
            date: new Date('May 29, 2020'),
            price: 9.61
        },
        {
            date: new Date('June 1, 2020'),
            price: 9.75
        },
        {
            date: new Date('June 2, 2020'),
            price: 9.77
        },
        {
            date: new Date('June 3, 2020'),
            price: 9.98
        },
        {
            date: new Date('June 4, 2020'),
            price: 10.02
        },
        {
            date: new Date('June 4, 2020'),
            price: 10.01
        }
    ]}
]

mongoose.connect(MONGODB_URL)
    Underlying.create(underlyings)
    .then(mongoose.disconnect)
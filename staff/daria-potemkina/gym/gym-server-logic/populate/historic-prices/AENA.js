require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(
    {   
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 04, 2020'),
        price: 108.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 05, 2020'),
        price: 108.30
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 06, 2020'),
        price: 107.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 07, 2020'),
        price: 105.70
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 08, 2020'),
        price: 104.60
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 11, 2020'),
        price: 102.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 12, 2020'),
        price: 102.80
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 13, 2020'),
        price: 104.20
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 14, 2020'),
        price: 112.20
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 15, 2020'),
        price: 112.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 18, 2020'),
        price: 112.10
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 19, 2020'),
        price: 114.40
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 20, 2020'),
        price: 116.10
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 21, 2020'),
        price: 6.72
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 22, 2020'),
        price: 121.80
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 25, 2020'),
        price: 128.50
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 26, 2020'),
        price: 133.50
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 27, 2020'),
        price: 132.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 28, 2020'),
        price: 128.20
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('May 29, 2020'),
        price: 131.40
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 02, 2020'),
        price: 137.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 03, 2020'),
        price: 144.70
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 04, 2020'),
        price: 137.20
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 05, 2020'),
        price: 143.60
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 08, 2020'),
        price: 140.60
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 09, 2020'),
        price: 135.30
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 10, 2020'),
        price: 131.50
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 11, 2020'),
        price: 123.80
    },
    
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 12, 2020'),
        price: 124.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 15, 2020'),
        price: 125.60
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 16, 2020'),
        price: 127.40
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 17, 2020'),
        price: 128.60
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 18, 2020'),
        price: 127.19
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e5'),
        date: new Date('June 19, 2020'),
        price: 124.80
    }
)
.then(mongoose.disconnect)
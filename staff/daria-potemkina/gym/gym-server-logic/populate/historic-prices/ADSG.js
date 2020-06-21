require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(
    {   
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 04, 2020'),
        price: 209.10
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 05, 2020'),
        price: 207.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 06, 2020'),
        price: 205.50
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 07, 2020'),
        price: 204.30
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 08, 2020'),
        price: 198.15
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 11, 2020'),
        price: 195.25
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 12, 2020'),
        price: 200.30
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 13, 2020'),
        price: 104.20
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 14, 2020'),
        price: 214.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 15, 2020'),
        price: 214.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 18, 2020'),
        price: 218.10
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 19, 2020'),
        price: 220.20
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 20, 2020'),
        price: 116.10
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 21, 2020'),
        price: 216.70
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 22, 2020'),
        price: 217.80
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 25, 2020'),
        price: 221.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 26, 2020'),
        price: 228.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 27, 2020'),
        price: 233.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 28, 2020'),
        price: 239.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('May 29, 2020'),
        price: 237.20
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 02, 2020'),
        price: 241.10
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 03, 2020'),
        price: 250.80
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 04, 2020'),
        price: 254.80
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 05, 2020'),
        price: 264.50
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 08, 2020'),
        price: 257.40
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 09, 2020'),
        price: 251.30
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 10, 2020'),
        price: 248.20
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 11, 2020'),
        price: 234.30
    },
    
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 12, 2020'),
        price: 230.10
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 15, 2020'),
        price: 230.80
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 16, 2020'),
        price: 240.50
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 17, 2020'),
        price: 241.40
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 18, 2020'),
        price: 240.70
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e6'),
        date: new Date('June 19, 2020'),
        price: 237.60
    }
)
.then(mongoose.disconnect)
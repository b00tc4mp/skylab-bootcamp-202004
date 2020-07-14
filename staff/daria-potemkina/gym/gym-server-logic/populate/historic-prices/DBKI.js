require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(
    {   
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 04, 2020'),
        price: 7.16
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 05, 2020'),
        price: 6.78
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 06, 2020'),
        price: 6.43
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 07, 2020'),
        price: 6.55
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 08, 2020'),
        price: 6.54
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 11, 2020'),
        price: 6.36
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 12, 2020'),
        price: 6.51
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 13, 2020'),
        price: 6.09
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 14, 2020'),
        price: 6.05
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 15, 2020'),
        price: 5.94
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 18, 2020'),
        price: 6.56
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 19, 2020'),
        price: 6.59
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 20, 2020'),
        price: 6.85
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 21, 2020'),
        price: 6.72
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 22, 2020'),
        price: 6.69
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 25, 2020'),
        price: 6.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 26, 2020'),
        price: 7.50
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 27, 2020'),
        price: 7.79
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 28, 2020'),
        price: 7.83
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('May 29, 2020'),
        price: 7.53
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 02, 2020'),
        price: 7.95
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 03, 2020'),
        price: 8.15
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 04, 2020'),
        price: 8.32
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 05, 2020'),
        price: 8.71
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 08, 2020'),
        price: 9.04
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 09, 2020'),
        price: 8.62
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 10, 2020'),
        price: 8.13
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 11, 2020'),
        price: 8.13
    },
    
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 12, 2020'),
        price: 8.28
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 15, 2020'),
        price: 7.89
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 16, 2020'),
        price: 8.60
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 17, 2020'),
        price: 8.52
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 18, 2020'),
        price: 8.37
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e7'),
        date: new Date('June 19, 2020'),
        price: 8.40
    }
)

.then(mongoose.disconnect)
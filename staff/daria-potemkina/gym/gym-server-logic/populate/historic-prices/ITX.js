require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(
    {   
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 04, 2020'),
        price: 24.50
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 05, 2020'),
        price: 25.61
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 06, 2020'),
        price: 24.59
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 07, 2020'),
        price: 24.37
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 08, 2020'),
        price: 23.63
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 11, 2020'),
        price: 24.59
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 12, 2020'),
        price: 24.37
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 13, 2020'),
        price: 23.33
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 14, 2020'),
        price: 24.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 15, 2020'),
        price: 24.17
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 18, 2020'),
        price: 24.05
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 19, 2020'),
        price: 24.71
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 20, 2020'),
        price: 24.52
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 21, 2020'),
        price: 24.74
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 22, 2020'),
        price: 25.56
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 25, 2020'),
        price: 24.84
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 26, 2020'),
        price: 24.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 27, 2020'),
        price: 24.60
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 28, 2020'),
        price: 24.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('May 29, 2020'),
        price: 24.58
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 02, 2020'),
        price: 24.70
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 03, 2020'),
        price: 24.15
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 04, 2020'),
        price: 24.08
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 05, 2020'),
        price: 24.50
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 08, 2020'),
        price: 24.84
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 09, 2020'),
        price: 24.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 10, 2020'),
        price: 24.60
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 11, 2020'),
        price: 24.90
    },
    
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 12, 2020'),
        price: 25.56
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 15, 2020'),
        price: 24.84
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 16, 2020'),
        price: 24.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 17, 2020'),
        price: 24.60
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 18, 2020'),
        price: 24.08
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e4'),
        date: new Date('June 19, 2020'),
        price: 24.50
    }
    
    
    )
    .then(mongoose.disconnect)

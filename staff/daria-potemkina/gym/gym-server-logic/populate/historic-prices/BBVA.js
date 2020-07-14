require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(

    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 01, 2020'),
        price: 3.18
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 04, 2020'),
        price: 3.05
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 05, 2020'),
        price: 3.02
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 06, 2020'),
        price: 2.95
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 07, 2020'),
        price: 2.87
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 08, 2020'),
        price: 2.93
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 11, 2020'),
        price: 2.86
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 12, 2020'),
        price: 2.89
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 13, 2020'),
        price: 2.80
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 14, 2020'),
        price: 2.70
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 15, 2020'),
        price: 2.81
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 18, 2020'),
        price: 2.90
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 19, 2020'),
        price: 2.82
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 20, 2020'),
        price: 2.76
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 21, 2020'),
        price: 2.82
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 22, 2020'),
        price: 2.86
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 26, 2020'),
        price: 3.00
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 27, 2020'),
        price: 3.23
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 28, 2020'),
        price: 3.27
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('May 29, 2020'),
        price: 3.13
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 01, 2020'),
        price: 3.10
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 02, 2020'),
        price: 3.34
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 03, 2020'),
        price: 3.47
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 04, 2020'),
        price: 3.59
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 05, 2020'),
        price: 3.92
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 08, 2020'),
        price: 3.34
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 09, 2020'),
        price: 3.47
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 10, 2020'),
        price: 3.59
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 11, 2020'),
        price: 3.92
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 12, 2020'),
        price: 3.47
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 15, 2020'),
        price: 3.59
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 16, 2020'),
        price: 3.92
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 17, 2020'),
        price: 3.34
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 18, 2020'),
        price: 3.47
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e2'),
        date: new Date('June 19, 2020'),
        price: 3.59
    })

    .then(mongoose.disconnect)
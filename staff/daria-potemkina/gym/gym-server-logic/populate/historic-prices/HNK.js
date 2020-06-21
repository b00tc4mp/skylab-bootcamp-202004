require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(
    {   
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 04, 2020'),
        price: 90.43
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 05, 2020'),
        price: 90.36
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 06, 2020'),
        price: 88.99
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 07, 2020'),
        price: 85.74
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 08, 2020'),
        price: 90.43
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 11, 2020'),
        price: 90.36
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 12, 2020'),
        price: 88.99
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 13, 2020'),
        price: 85.74
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 14, 2020'),
        price: 85.95
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 15, 2020'),
        price: 83.18
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 18, 2020'),
        price: 90.82
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 19, 2020'),
        price: 88.51
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 20, 2020'),
        price: 91.02
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 21, 2020'),
        price: 93.11
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 22, 2020'),
        price: 93.99
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 25, 2020'),
        price: 99.62
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 26, 2020'),
        price: 105.15
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 27, 2020'),
        price: 103.92
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 28, 2020'),
        price: 100.76
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('May 29, 2020'),
        price: 103.40
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 02, 2020'),
        price: 103.06
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 03, 2020'),
        price: 110.37
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 04, 2020'),
        price: 110.78
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 05, 2020'),
        price: 114.34
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 08, 2020'),
        price: 116.72
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 09, 2020'),
        price: 113.72
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 10, 2020'),
        price: 111.13
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 11, 2020'),
        price: 105.17
    },
    
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 12, 2020'),
        price: 109.49
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 15, 2020'),
        price: 109.08
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 16, 2020'),
        price: 110.77
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 17, 2020'),
        price: 111.25
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 18, 2020'),
        price: 110.85
    },
    {
        product: ObjectId('5eee3cf9042e2ae59798b6e8'),
        date: new Date('June 19, 2020'),
        price: 111.25
    }
)

.then(mongoose.disconnect)
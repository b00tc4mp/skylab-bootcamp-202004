require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 04, 2020'),
    price: 8.90
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 05, 2020'),
    price: 8.97
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 06, 2020'),
    price: 8.88
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 07, 2020'),
    price: 8.96
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 08, 2020'),
    price: 8.85
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 11, 2020'),
    price: 8.81
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 12, 2020'),
    price: 8.68
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 13, 2020'),
    price: 8.60
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 14, 2020'),
    price: 8.55
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 15, 2020'),
    price: 8.61
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 19, 2020'),
    price: 9.06
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 20, 2020'),
    price: 8.90
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 21, 2020'),
    price: 8.92
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 22, 2020'),
    price: 8.82
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 25, 2020'),
    price: 9.07
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 26, 2020'),
    price: 9.30
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 27, 2020'),
    price: 9.22
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 28, 2020'),
    price: 9.59
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('May 29, 2020'),
    price: 9.61
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 01, 2020'),
    price: 9.75
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 02, 2020'),
    price: 9.77
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 03, 2020'),
    price: 9.98
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 04, 2020'),
    price: 10.02
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 05, 2020'),
    price: 9.75
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 08, 2020'),
    price: 9.77
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 09, 2020'),
    price: 9.98
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 10, 2020'),
    price: 10.02
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 11, 2020'),
    price: 10.01
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 12, 2020'),
    price: 9.75
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 15, 2020'),
    price: 9.77
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 16, 2020'),
    price: 9.98
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 17, 2020'),
    price: 10.02
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 18, 2020'),
    price: 9.75
},
{
    product: ObjectId('5eee3cf9042e2ae59798b6e3'),
    date: new Date('June 19, 2020'),
    price: 9.77
})

.then(mongoose.disconnect)
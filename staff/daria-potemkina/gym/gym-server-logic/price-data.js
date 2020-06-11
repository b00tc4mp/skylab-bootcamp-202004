require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

mongoose.connect(MONGODB_URL)

Price.create(
    {
        product: ObjectId('5edfbb942fae644ccab4aa82'),
        date: 'June 09 2020',
        price: 0.17
    },
    {
        product: ObjectId('5edfbb942fae644ccab4aa80'),
        date: 'June 09 2020',
        price: 0.70
    },
    {
        product: ObjectId('5edfbb942fae644ccab4aa7f'),
        date: 'June 09 2020',
        price: 9.85
    },
    {
        product: ObjectId('5edfbb942fae644ccab4aa7e'),
        date: 'June 09 2020',
        price: 3.60
    }
)


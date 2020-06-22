require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose

const {random} = Math

const randomPrice = (min, max) => (random() * (max - min + 1) + min).toFixed(2) * 1

let dateToday = new Date().toString().split(' ').slice(1, 4)

dateToday.push('UTC')

dateToday = dateToday.join(' ')

mongoose.connect('mongodb://localhost:27017/gym-api')

Price.create(
    {
        product: ObjectId('5ef118713211394184e93ee8'),
        date: new Date(dateToday),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5ef118713211394184e93ee8'),
        date: new Date('June 20, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5ef118713211394184e93ee8'),
        date: new Date('June 21, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5ef118713211394184e93ee8'),
        date: new Date('June 18, 2020'),
        price: randomPrice(3, 4)
    },
    {
        product: ObjectId('5ef118713211394184e93ee8'),
        date: new Date('June 22, 2020'),
        price: randomPrice(3, 4)
    }
)

.then(mongoose.disconnect)

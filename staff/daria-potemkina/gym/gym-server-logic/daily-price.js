require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose
const { random } = Math

const randomPrice = (min, max) => (random() * (max - min + 1) + min).toFixed(2) * 1

mongoose.connect(MONGODB_URL)

Price.create(
    {
        product: ObjectId('5ee3d2b78de56b8153b7d830'),
        date: new Date().toString().split(' ').slice(1, 4).join(' '),
        price: randomPrice(0, 1)
    },
    {
        product: ObjectId('5ee3d2b78de56b8153b7d82e'),
        date: new Date().toString().split(' ').slice(1, 4).join(' '),
        price: randomPrice(0, 1)
    },
    {
        product: ObjectId('5ee3d2b78de56b8153b7d82d'),
        date: new Date().toString().split(' ').slice(1, 4).join(' '),
        price: randomPrice(6, 12)
    },
    {
        product: ObjectId('5ee3d2b78de56b8153b7d82c'),
        date: new Date().toString().split(' ').slice(1, 4).join(' '),
        price: randomPrice(2, 6)
    },
    {
        product: ObjectId('5ee3d138b954257e144fce6d'),
        date: new Date().toString().split(' ').slice(1, 4).join(' '),
        price: randomPrice(2, 6)
    },
    {
        product: ObjectId('5ee3d138b954257e144fce6e'),
        date: new Date().toString().split(' ').slice(1, 4).join(' '),
        price: randomPrice(7, 13)
    },
    {
        product: ObjectId('5ee3d138b954257e144fce6f'),
        date: new Date().toString().split(' ').slice(1, 4).join(' '),
        price: randomPrice(20, 30)
    }
)
    .then(mongoose.disconnect)
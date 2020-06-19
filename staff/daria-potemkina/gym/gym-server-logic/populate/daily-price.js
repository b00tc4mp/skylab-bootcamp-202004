require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose
const { random } = Math

const randomPrice = (min, max) => (random() * (max - min + 1) + min).toFixed(2) * 1

mongoose.connect('mongodb://localhost:27017/gym-api-test')

let dateToday = new Date().toString().split(' ').slice(1, 4).join(' ')

Price.create(
    // {
    //     product: ObjectId('5eec68223ff712a6645b9e56'),
    //     date: new Date(),
    //     price: randomPrice(0, 1)
    // },
    {
        product: ObjectId('5eecb290eff38047d2251154'),
        date: new Date(dateToday),
        price: randomPrice(6, 12)
    },
    {
        product: ObjectId('5eecb290eff38047d2251155'),
        date: new Date(dateToday),
        price: randomPrice(6, 12)
    }
    ,
    {
        product: ObjectId('5eecb290eff38047d2251156'),
        date: new Date(dateToday),
        price: randomPrice(2, 6)
    },
    {
        product: ObjectId('5eecb290eff38047d2251157'),
        date: new Date(dateToday),
        price: randomPrice(2, 6)
    },
    // {
    //     product: ObjectId('5ee3d138b954257e144fce6e'),
    //     date: new Date(),
    //     price: randomPrice(7, 13)
    // },
    // {
    //     product: ObjectId('5ee3d138b954257e144fce6f'),
    //     date: new Date(),
    //     price: randomPrice(20, 30)
    // }
)
    .then(mongoose.disconnect)
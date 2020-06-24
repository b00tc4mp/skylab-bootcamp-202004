require('dotenv').config()

const { mongoose, models: { Price } } = require('gym-data')
const { ObjectId } = mongoose
const { random } = Math
const cron = require('node-cron')

const randomPrice = (min, max) => (random() * (max - min + 1) + min).toFixed(2) * 1

let dateToday = new Date().toString().split(' ').slice(1, 4)

dateToday.push('UTC')

dateToday = dateToday.join(' ')

cron.schedule("00 09 * * *", async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/gym-api')
        
        console.log('connected')

        await Price.create(
            {
                product: ObjectId('5ef24a6955d4824a5b12434b'),
                date: new Date(dateToday),
                price: randomPrice(3, 4)
            },
            {
                product: ObjectId('5ef118713211394184e93ee8'),
                date: new Date(dateToday),
                price: randomPrice(3, 4)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6e6'),
                date: new Date(dateToday),
                price: randomPrice(194, 205)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6e5'),
                date: new Date(dateToday),
                price: randomPrice(102, 109)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6e2'),
                date: new Date(dateToday),
                price: randomPrice(3, 4)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6e7'),
                date: new Date(dateToday),
                price: randomPrice(6, 8)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6e8'),
                date: new Date(dateToday),
                price: randomPrice(103, 111)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6e3'),
                date: new Date(dateToday),
                price: randomPrice(8, 10)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6e4'),
                date: new Date(dateToday),
                price: randomPrice(23, 25)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6d2'),
                date: new Date(dateToday),
                price: randomPrice(3, 4)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6d3'),
                date: new Date(dateToday),
                price: randomPrice(7,9)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6d4'),
                date: new Date(dateToday),
                price: randomPrice(3, 4)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6d5'),
                date: new Date(dateToday),
                price: randomPrice(2,3)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6d6'),
                date: new Date(dateToday),
                price: randomPrice(128, 124)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6d7'),
                date: new Date(dateToday),
                price: randomPrice(25, 27)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6d8'),
                date: new Date(dateToday),
                price: randomPrice(240, 244)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6d9'),
                date: new Date(dateToday),
                price: randomPrice(7, 9)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6da'),
                date: new Date(dateToday),
                price: randomPrice(0.5, 0.8)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6dc'),
                date: new Date(dateToday),
                price: randomPrice(0.4, 0.5)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6de'),
                date: new Date(dateToday),
                price: randomPrice(10, 11)
            },
            {
                product: ObjectId('5eee3cf9042e2ae59798b6e0'),
                date: new Date(dateToday),
                price: randomPrice(8, 9)
            })

    console.log('prices created')

    }catch(error){
        console.error(error)
    }finally{
        await mongoose.disconnect()
    }
})

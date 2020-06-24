require('dotenv').config()
const { closeUserPosition, profitAndLoss } = require('gym-server-logic')

const cron = require('node-cron')

const { mongoose, models: { User } } = require('gym-data')

cron.schedule("00 23 * * *", async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gym-api')
        console.log('connected')

        const users = await User.find()

        for (let i in users) {
            console.log(users[i]._id.toString())
            try {
                console.log('check close position')
                await closeUserPosition(users[i]._id.toString())

            } catch (error) {
                console.error(error.message)
            }
        }

        for (let i in users) {
            console.log(users[i]._id.toString())
            try {
                console.log('check profit and loss')
                await profitAndLoss(users[i]._id.toString())

            } catch (error) {
                console.error(error.message)
            }
        }
    } catch (error) {
        console.error(error)
    } finally {
        await mongoose.disconnect()
    }
})
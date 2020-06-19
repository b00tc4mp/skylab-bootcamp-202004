require('dotenv').config()
const closePosition = require('../close-user-position')
const profitAndLoss = require('../profit-and-loss')

const { env: { MONGODB_URL } } = process
const { mongoose, models: { User } } = require('gym-data')

mongoose.connect('mongodb://localhost:27017/gym-api-test')
.then(() => {
    
    return (async() => {
        const users = await User.find()
        
        for (let i in users){
            try{
                await closePosition(users[i]._id.toString())

            }catch(error){
                console.error(error.message)
            }
        }

        for(let i in users){
            try {
                await profitAndLoss(users[i]._id.toString())
                
            } catch (error) {
                console.error(error.message)
            }
        }

    })()
})
.catch(error => console.log(error))
.then(mongoose.disconnect)
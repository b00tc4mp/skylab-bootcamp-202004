require('dotenv').config()
const sendFoodList = require('./send-food-list')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)
.then(() => {
    try {
        debugger
           sendFoodList('5ee8d0663cb59109852e7894','<h1>hola</h1>', 'sergicast@hotmail.com')
           .then(()=>{console.log('message sended')})

        } catch (error) {
            console.error('KO sync', error.message)
        }


    })
 

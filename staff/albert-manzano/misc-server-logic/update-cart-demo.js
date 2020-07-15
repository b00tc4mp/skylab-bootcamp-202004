require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')

const updateCart = require('./misc-server-logic/update-cart')
debugger

mongo.connect('mongodb://localhost:27017/misc-api')
    .then(() =>
        updateCart('5ed0f0e0f24a933c0a5e90e1', '5ed51ae3e0675be841b149d9', 2)
            .then(console.log)
    )
    .catch(console.error)
    .then(mongo.disconnect)

    // { "_id" : ObjectId("5ed0f0e0f24a933c0a5e90e1"), "name" : "albert", "surname" : "manzano", "email" : "albert@gmail.com", "password" : "123123123" }

const mongo = require('./mongo')

mongo.connect('mongodb://localhost:27017')
    .then(connection => {
        debugger
    })
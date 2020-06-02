const mongo = require('./mongo')
debugger
mongo.connect('mongodb://localhost:27017')
    .then(console.log)
    .catch(console.error)
    .then(() => mongo.connect('mongodb://localhost:27017'))
    .then(console.log)
    .catch(console.error)
const authenticateUser = require('./authenticate-user')
const { mongoose } = require('../moove-it-data')

debugger
mongoose.connect('mongodb://localhost:27017/misc-api')
    .then(() => {
        
    return authenticateUser('test2@test.com', '123123123')
            .then(console.log)
            .catch(console.log)
     })
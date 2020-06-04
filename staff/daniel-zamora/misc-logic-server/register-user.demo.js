const registerUser = require('./register-user')
const { mongoose } = require('../misc-data')

debugger
mongoose.connect('mongodb://localhost:27017/misc-api')
    .then(() => {
        
    return registerUser('test', 'daniel', 'test2@test.com', '123123123')
            .then(() => console.log('registered!'))
            .catch(console.log)
     })
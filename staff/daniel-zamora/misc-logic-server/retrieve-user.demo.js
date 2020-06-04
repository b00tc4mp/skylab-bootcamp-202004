const retrieveUser = require('./retrieve-user')
const { mongoose } = require('../misc-data')

mongoose.connect('mongodb://localhost:27017/misc-api')
    .then(() => {
        
    return retrieveUser('5ed8f22e6956145aa1508941')
            .then((user) => console.log(user))
            .catch(console.log)
     })
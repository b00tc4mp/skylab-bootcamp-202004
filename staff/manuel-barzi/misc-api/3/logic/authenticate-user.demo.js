const authenticateUser = require('./authenticate-user')

authenticateUser('pepigri@mail.com', '123')
    .then(console.log)
    .catch(console.error)
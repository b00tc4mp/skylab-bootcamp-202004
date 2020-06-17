global.XMLHttpRequest = require('xhr2')
const authenticateUser = require('./authenticate-user')

return authenticateUser("test1@mail.com", "123123123")
    .then(console.log)
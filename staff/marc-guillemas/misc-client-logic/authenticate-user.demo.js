const authenticateUser = require('./authenticate-user')
global.XMLHttpRequest = require('xhr2')

return authenticateUser("sergipantera@mail.com", "123123")
    .then(console.log)
    .catch(console.error)
global.XMLHttpRequest = require('xhr2')
const registerUser = require('./register-user')

return registerUser('daniel', 'zamora', "test2@mail.com", "123123123")
    .then(console.log)
    .catch(console.log)
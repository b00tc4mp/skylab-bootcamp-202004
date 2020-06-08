global.XMLHttpRequest = require('xhr2')
const register = require('./register')

return register('a ver', 'conyo', "conyo@amail.com", "123123123")
    .then(console.log)
    .catch(console.log)
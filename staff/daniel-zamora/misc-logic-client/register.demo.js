global.XMLHttpRequest = require('xhr2')
const register = require('./register')

return register('daniel', 'kalise', "daru1@amail.com", "123123123")
    .then(console.log)
const registerUser = require('./register-user')
const {utils: {call}} = require('misc-commons')
global.XMLHttpRequest = require('xhr2')

return registerUser('pan', 'tera', 'pantera@mail.com', '123123123')
    .then((status) => {console.log(status)})

global.XMLHttpRequest = require('xhr2')

const registerUser = require('./register-user')

registerUser('pepito', 'perez', 'pepito114@mail.com', '123123123')
    .then(() => console.log('ok'))
    .catch(error => console.error(error))
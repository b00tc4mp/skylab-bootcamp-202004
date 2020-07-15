global.XMLHttpRequest = require('xhr2')
const login = require('./login')

return login("daru@amail.com","123123123")
        .then(console.log)
global.XMLHttpRequest = require('xhr2')
const retrieveUserBlueprints = require('./retrieve-user-blueprint')

return retrieveUserBlueprints()
    .then(console.log)
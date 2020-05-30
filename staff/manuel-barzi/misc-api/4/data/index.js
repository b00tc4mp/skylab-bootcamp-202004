const buildManager = require('./manager-builder')

module.exports = {
    contacts: buildManager('contacts'),
    users: buildManager('users'),
    stickies: buildManager('stickies')
}
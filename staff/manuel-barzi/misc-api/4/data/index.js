const buildManager = require('./build-manager')

module.exports = {
    contacts: buildManager('contacts'),
    users: buildManager('users'),
    stickies: buildManager('stickies')
}
const buildManager = require('./manager-builder')

module.exports = {
    contacts: buildManager('contacts'),
    stickies: buildManager('stickies'),
    mongo: require('./mongo')
}
module.exports = {
    contacts: require('./manager')('contacts'),
    users: require('./manager')('users'),
    stickies: require('./manager')('stickies')
}
module.exports = {
    contacts: require('./manager')('contacts'),
    users: require('./manager')('users'),
    sessions: require('./manager')('sessions'),
    stickies: require('./manager')('stickies')
}
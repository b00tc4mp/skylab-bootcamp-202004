const { stickies: { search } } = require('../data')

module.exports = (query, callback) => {
    // TODO validate input fields
    search(query, callback => {

    })
    // TODO check user exists, otherwise error

    // TODO filter stickies from this user and return them if found, otherwise return []
}
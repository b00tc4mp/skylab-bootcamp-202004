require('../utils/string')
const fs = require('fs')
const path = require('path')
const { find } = require('../data/users')

module.exports = (userId, idContact, callback) => {
    String.validate.notVoid(userId)

    find({ id: userId }, (error, [user]) => {
        if (error) return callback(error)
        if (!user) return callback(new Error('something wrong happen'))

        fs.unlink(path.join(__dirname, '..', 'data', 'contacts', `${idContact}.json`), error => {
            if (error) return callback(error)

            return callback(null, "success")
        })
    })
}

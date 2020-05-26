const {find} = require('../../../data')
require('../../../utils/function')
require('../../../utils/string')

module.exports = (id,callback) => {
    String.validate.notVoid(id)
    Function.validate(callback)

    find({id}, 'sessions', (error, [session]) => {
        if (error) return callback(error)

        if(!session) return callback(new Error(`session with id ${id} does not exist`))

        callback(null,session)
    })
}
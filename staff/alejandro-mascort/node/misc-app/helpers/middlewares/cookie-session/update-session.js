const { find, update } = require('../../../data')
require('../../../utils/string')
require('../../../utils/function')

module.exports = (id, data, callback) => {
    String.validate.notVoid(id)
    Function.validate(callback)

    find({id}, 'sessions', (error, [session]) => {
        if (error) return callback(error)

        if(!session) return callback(new Error(`session with id ${id} does not exist`))

        for (let key in data) session[key] = data[key]

        update(id, session, 'sessions', error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}

require('../utils/polyfills/string')
const Email = require('../utils/email')
require('../utils/polyfills/function')
const { DuplicityError } = require('../errors')

const mongo = require('../data/mongo')

module.exports = (register) => {
debugger
    const { name, surname, email, password } = register
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return mongo.connect()
        .then(connection => {
            const db = connection.db()

            const users = db.collection('users')

            return users.findOne({email})
                .then(user => {                
                    if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)
                
                    return users.insertOne(register)
                })
        })
        

}


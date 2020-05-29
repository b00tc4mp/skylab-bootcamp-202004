require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/json')
const { users: { find, update } } = require('../data')
const { UnexistenceError } = require('../errors')

module.exports = (userId, data) => {
    if( typeof data !== 'object' ) throw new TypeError(`${data} is not an object`)

    const {name, surname, email, password} = data
    
    if(name) String.validate.notVoid(name)
    if (surname) String.validate.notVoid(surname)

    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return find({ id: userId })
        .then(users => {            
            const [user] = users

            if (!user)  throw new UnexistenceError(`user with id ${userId} does not exist`)

            const newUser = { name, surname, email, password }
    
            return update(userId, newUser)
        })
}
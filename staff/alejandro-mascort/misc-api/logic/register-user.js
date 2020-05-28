require('../utils/polyfills/string')
const Email = require('../utils/email')
require('../utils/polyfills/function')
const uid = require('../utils/uid')
const fs = require('fs')
const path = require('path')
const {find} =require('../data')
const { DuplicityError } = require('../errors')


module.exports = (register) => {
debugger
    const { name, surname, email, password } = register
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    const data = path.join(__dirname, '..', 'data')

    return new Promise((resolve, reject) => {
        find({ email },'users', (error, [user]) => {
            if (error) return reject(error)
        
            if (user) return reject(new DuplicityError(`user with e-mail ${email} already exists`))
        
            const id = uid()
            
            const newUser = { id, name, surname, email, password }
        
            fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
                if (error) return reject(error)
        
                resolve(null, id)
            })
        })
    })
}


const fs = require('fs')
const path = require('path')
require('../utils/json')
const Email = require('../utils/email')
require('../utils/string')
const uid = require ('../utils/uid')
require ('../utils/function')

module.exports = (newUser, callback) => {

    const {name, surname, email, password } = newUser

    String.validate.alphabetic(name)
    String.validate.alphabetic(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    Function.validate(callback)

    const id = uid()
    
    newUser.user = id

    fs.writeFile(path.join(__dirname, '..','data','users', `${id}.json`), JSON.prettify(newUser), error => {
        if (error) throw new Error(error)
   
        callback(null, id)
   
    })
}
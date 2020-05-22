const fs = require('fs')
const path = require('path')
require('../utils/string')
require('../utils/function')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')


module.exports = (register,callback) => {

    const {name,surname,email,password} = register

    
    String.validate.notVoid(name)
    String.validate.notVoid(surname)

    String.validate.notVoid(email)
    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    Function.validate(callback)


    fs.readdir(path.join(__dirname, '..', 'data','users'), (error, files) => {
        if (error) return callback(error)

        let wasError = false
        let findEmail = false
        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', 'users', file), 'utf8', (error, body) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) {
                    const {email:_email} = JSON.parse(body)

                    if(_email === email) return callback(null,'The user already exist'); //TODO is right???  
                }
            })
        })

        const id = uid();
        fs.writeFile(path.join(__dirname, '..', 'data', 'users', `${id}.json`),
                    JSON.prettify({name,surname,email,password,id}), 
                    (error)=>{
                        if(error) return callback(error);

                        callback(null,id)
                        
        })
    })
}
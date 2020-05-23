const fs = require('fs')
const path = require('path')
const Email = require('../utils/email')
require('../utils/string')


module.exports = (email, password, callback) => {   
    
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    
    fs.readdir(path.join(__dirname,'..', 'data','users'), (error, files) => {
        if(error) throw new Error(error)
        debugger
        let count = 0
        if(files) {
            files.forEach(file => { debugger
                fs.readFile(path.join(__dirname,'..','data','users', file), (error, data) => { 
                   debugger
                   console.log(data)
                   data = JSON.parse(data)
                    if (error) throw new Error(error)
    
                    const {email: _email, password: _password} = data
    
                    if(email === _email && password === _password)  return callback(null)
                    if(++count === files.length) callback(new Error('wrong credentials'))
                   
                })
            })
        }else{
            callback(new Error('No users'))
        }
        
    })
}



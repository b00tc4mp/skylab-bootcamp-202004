const fs = require('fs')
const path = require('path')

module.exports = (body, callback) => {
    const {email, password} = body

    fs.readdir(path.join(__dirname, '..', 'data', 'users'), (error, files) => {
        if(error) return callback(error)

        let wasError = false

        let userMatched;
        let count = 0
    
        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', 'users', file), 'utf8', (error, json)=>{
                if(error) {
                    if(!wasError) {
                        callback(error)
                    }

                    return
                }

                if(!wasError){
                    const user = JSON.parse(json)

                    // const values = Object.values(user)

                    if(user.email === email && user.password===password) userMatched = true

                    if(++count === files.length) callback(null, userMatched)
                }
            })
        })
    })
}
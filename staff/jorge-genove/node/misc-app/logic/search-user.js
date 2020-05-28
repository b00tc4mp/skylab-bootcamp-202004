const fs = require('fs')
const path = require('path')

const searchUsers = (userId,query,callback) => {
    fs.readdir(path.join(__dirname, '..', 'data','contacts'), (error, files) => {
        if (error) return callback(error)

        files = files.filter(file => path.extname(file) === '.json')
        let wasError = false

        const users = []
        let count = 0

        files.forEach(file => {debugger
            fs.readFile(path.join(__dirname, '..', 'data','users', file), 'utf8', (error, json) => {debugger
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) {
                    const user = JSON.parse(json)
                    

                    const values = Object.values(user)

                    const matches = values.some(value => value.includes(query))

                    if (matches) {debugger
                        user.id = file.substring(0, file.indexOf('.json'))
                        if(user.id!==userId) {debugger

                            users.push(user)
                        }
                    }

                    if (++count === files.length) callback(null, users)
                }
            })
        })
    })
}
module.exports = searchUsers
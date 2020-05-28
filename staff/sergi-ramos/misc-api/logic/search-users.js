const fs = require('fs')
const path = require('path')

module.exports = (userId, query) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)

    return new Promise((resolve, reject) => {

        fs.readdir(path.join(__dirname, '..', 'data', 'users'), (error, files) => {
            if (error) return reject(error)

            files = files.filter(file => path.extname(file) === '.json')
            let wasError = false

            const users = []
            let count = 0

            files.forEach(file => {
                fs.readFile(path.join(__dirname, '..', 'data', 'users', file), 'utf8', (error, json) => {
                    if (error) {
                        if (!wasError) {
                            reject(error)

                            wasError = true
                        }
                        return
                    }

                    if (!wasError) {
                        const user = JSON.parse(json)

                        const values = Object.values(user)

                        const matches = values.some(value => value.includes(query))

                        if (matches) {
                            user.id = file.substring(0, file.indexOf('.json'))
                            if (user.id !== userId) {

                                users.push(user)
                            }
                        }

                        if (++count === files.length) resolve(users)
                    }
                })
            })
        })
    })
}

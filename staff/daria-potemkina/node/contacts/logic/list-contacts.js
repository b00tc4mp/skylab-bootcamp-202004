const fs = require('fs')
const path = require('path')

function listContacts(callback) {
    fs.readdir(path.join(__dirname, '..', 'data'), (error, files) => {
        if (error) return callback(error)

        let results = []
        let count = 0
        let noError = true

        for (let i in files) {
            fs.readFile(path.join(__dirname, '..', 'data', files[i]), (error, data) => {
                if (error) {
                    if (noError) {
                        callback(error)

                        noError = false
                    }
                    return
                }
                if (noError) {
                    const obj = JSON.parse(data)

                    results.push(obj)

                    count++

                    if (count === files.length) callback(null, results)
                }
            })
        }
    })
}

module.exports = listContacts
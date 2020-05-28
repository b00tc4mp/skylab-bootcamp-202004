const fs = require('fs')
const path = require('path')

function listContacts(callback) {
    fs.readdir(path.join(__dirname, '..', 'data', 'contacts'), (error, files) => {
        if (error) return callback(error)

        let results = []
        let count = 0
        let wasError = false

        for (let i in files) {
            fs.readFile(path.join(__dirname, '..', 'data', 'contacts', files[i]), (error, data) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }
                    return
                }
                if (!wasError) {
                    const obj = JSON.parse(data)

                    obj.id = files[i].substring(0, files[i].indexOf('.json'))

                    results.push(obj)

                    count++

                    if (count === files.length) callback(null, results)
                }
            })
        }
    })
}

module.exports = listContacts
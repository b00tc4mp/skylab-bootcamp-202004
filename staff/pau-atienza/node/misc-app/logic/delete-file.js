const fs = require('fs')
const path = require('path')

module.exports = (queryid, string, callback) => {

    fs.readdir(path.join(__dirname, '..', 'data', string), (error, files) => {
        if (error) return callback(error)

        let wasError = false
        let fileFound = false
        let count = 0

        files.forEach(file => {
            if (error) {
                if (!wasError) {
                    callback(error)

                    wasError = true
                }
                return
            }

            if (file.includes(queryid)){
                fileFound = true
                fs.unlink(path.join(__dirname, '..', 'data', string, file), error=>{
                    if (error) return callback(error)

                    return callback(null)
                })
            }
            else if ((++count === files.length) && !fileFound) callback(new Error("File not found"))
        })
    })
}
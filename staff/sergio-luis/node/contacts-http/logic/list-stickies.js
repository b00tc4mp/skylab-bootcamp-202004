const fs = require('fs')
const path = require('path')

module.exports = callback => {
    fs.readdir(path.join(__dirname, '..', 'data', 'stickies'), (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const stickies = []

        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', 'stickies', file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) {
                    const sticky = JSON.parse(json)

                    sticky.id = file.substring(0, file.indexOf('.json'))

                    stickies.push(sticky)

                    if (stickies.length === files.length) callback(null, stickies)
                }
            })
        })
    })
}
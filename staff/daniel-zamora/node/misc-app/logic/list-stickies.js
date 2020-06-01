const fs = require('fs')
const path = require('path')

module.exports = (id, callback) => {
    fs.readdir(path.join(__dirname, '..', 'data', 'stickies'), (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const stickies = []

        if(files.length === 0){
                return callback(new Error('No stickies found'))
        } else {
            console.log(files)
        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', 'stickies', file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) { debugger
                    const sticky = JSON.parse(json)

                    sticky.id = file.substring(0, file.indexOf('.json'))

                    stickies.push(sticky)

                    if (stickies.length === files.length) callback(null, stickies)
                }
            })
        })
    } 
    })
} 
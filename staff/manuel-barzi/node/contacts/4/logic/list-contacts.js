const fs = require('fs')
const path = require('path')

module.exports = callback => {
    fs.readdir(path.join(__dirname, '..', 'data'), (error, files) => {
        if(error) return callback(error)

        
    })
}
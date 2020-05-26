const path = require("path")
const fs= require("fs")

function deleteFilesByExtensionsFromDirectory(directory, extension, callback) {
    fs.readdir(directory, (error, files) => {   
        if (error) return callback(error)
    
        files = files.filter(file => path.extname(file) === extension)
    
        if (!files.length) return callback(null)
    
        let deleted = 0
        let failed = false
    
        file.forEach(file => fs.unlink(path.join(directory, file), error => {
            if (!failed) {
                if (error) {
                    callback(error)
    
                    failed = true
    
                    return
                }
    
                deleted++
    
                if (deleted === files.length) callback(null)
            }
        }))
    })
}

module.exports = { deleteFilesByExtensionsFromDirectory }
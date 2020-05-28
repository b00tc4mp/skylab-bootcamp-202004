require('../utils/string')
const fs = require('fs')
const path = require('path')
const { find } = require('../data/users')

module.exports = (_userId, callback) => {
    String.validate.notVoid(userId)


    find({ id: _userId }, (error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error('something wrong happen'))

        fs.unlink(path.join(__dirname, '..', 'data', 'users', `${_userId}.json`), error => {
            if (error) return callback(error)
            let count=2
            fs.readdir(path.join(__dirname, '..', 'data', 'contacts'), (error, files) => {
                if (error) return callback(error)
   
                files.forEach(file => {
                    fs.readFile(path.join(__dirname, '..', 'data', 'contacts', file), 'utf8', (error, json) => {
                        if (error) return callback(error)

                        const { userId } = JSON.parse(json)

                        if (_userId === userId) {
                            fs.unlink(path.join(__dirname, '..', 'data', 'contacts', file), error => {
                                if (error) return callback(error)
                                
                            })
                        }

                    })
                    
                    fs.readdir(path.join(__dirname, '..', 'data', 'stickies'), (error, files) => {
                        if (error) return callback(error)
    
                        files.forEach(file => {
    
                            fs.readFile(path.join(__dirname, '..', 'data', 'sktickies', file), 'utf8', (error, json) => {
                                if (error) return callback(error)
    
                                const { userId } = JSON.parse(json)
    
                                if (_userId === userId) {
                                    fs.unlink(path.join(__dirname, '..', 'data', 'stickies', file), error => {
                                        if (error) return callback(error)
    
                                        return callback(null, "success")
                                    })
                                }
    
                            })
                        })
    
                    })
                })
            
            
            })

        })
    })
}

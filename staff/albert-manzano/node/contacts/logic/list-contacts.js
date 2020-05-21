const fs = require('fs')
const path = require('path')

module.exports = callback => {
    fs.readdir(path.join(__dirname, '..', 'data','contacts'), (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const contacts = []

        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data','contacts', file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }

                    return
                }

                if (!wasError) {
                    const contact = JSON.parse(json)

                    contact.id = file.substring(0, file.indexOf('.json'))

                    contacts.push(contact)

                    if (contacts.length === files.length) callback(null, contacts)
                }
            })
        })
    })
}

// const results = [];
// let count = 0;
// console.log(files)
// for (let i in files) {
//     fs.readFile(path.join( __dirname, '..', 'data', files[i]), (error, data) => {
//         if (error) throw error

//         const obj = JSON.parse(data);

//         results.push(obj);

//         count++

//         if (count === files.length) callback( null, results)
//     })
// }



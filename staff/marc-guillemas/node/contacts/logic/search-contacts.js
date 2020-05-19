const fs = require('fs')
const path = require('path')

function searchContacts(query, callback) {
    fs.readdir(path.join(__dirname,'..','data'), (error, files) => {
        if(error) throw new Error(error)

        let cont = 0
        const contacts = []
        files.forEach(file => {
            fs.readFile(path.join(__dirname,'..','data',file), (error, data) => {
                if(error) throw new Error(error)

                const obj = JSON.parse(data)
                const values = Object.values(obj)
                values.some(value => { value.includes(query)}) && contacts.push(obj)

                if(++cont === data.length) callback(null, contacts)
            })
        })
    })
}

module.exports = searchContacts
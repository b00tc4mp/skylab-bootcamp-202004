const searchContacts = require('../logic/search-contacts')
const Feedback = require('./Feedback')
const readline = require('readline')

function SearchContacts(callback) {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    interface.question("search user:", value =>{
        try {
             searchContacts(value, (error, results) => {
                if (error) {
                    interface.close()
                    return callback(error)
                }
                interface.close()
                console.table(results)
                callback(null)
             })
        } catch (error) {
            interface.close()
            return callback(error)
        }
    })
}

module.exports = SearchContacts
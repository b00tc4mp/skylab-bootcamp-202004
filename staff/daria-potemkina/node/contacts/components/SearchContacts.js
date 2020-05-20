const searchContacts = require('../logic/search-contact')
const readline = require('readline')

function SearchContacts(callback) {
    console.log('===============')
    console.log('Search Contacts')
    console.log('===============')

    const prompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    prompt.question('query?', value => {
        prompt.close()
        try {
            searchContacts(value, (error, result) => {
                if (error) {
                    console.log(error)

                    console.log('Filed')
                }

                console.table(result)

                callback(null)
            })
        } catch (error) {
            callback(error)
        }
    })

}

module.exports = SearchContacts
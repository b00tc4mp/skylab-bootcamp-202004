const readline = require('readline')
const Feedback = require('./Feedback')
const style = require('./Landing.style')
const searchContact = require('../logic/search-contact')


function SearchContacts(callback) {
    console.log(style.color, '=======')
    console.log(style.color, 'Search')
    console.log(style.color, '=======')

    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    (function searchInput() {
        console.log(style.color)
        interface.question(`Search contact: `, query => {
            if (query.trim() === '') {
                Feedback('Query is empty', 'error')
                searchInput()
            } else {
                searchContact(query, (error, queryResults) => {
                    if (error) return Feedback(error.message, 'error')
                    interface.close()
                    let transformedResults = queryResults.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
                    console.table(transformedResults)
                    callback(null)
                })
                
            }
        })
    })()
}

module.exports = SearchContacts
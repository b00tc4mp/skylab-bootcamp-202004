const listContacts = require('../logic/list-contacts');
const Feedback = require('./Feedback');


function ListContacts(callback) {
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    console.log('=============');
    console.log('List Contacts');
    console.log('=============');


    let count = 0;

    (function print() {
        try {
            listContacts((error, results) => {
                if (error) {
                    console.error(error)
                    Feedback('Failed to show results', 'error')
                }
                callback(null,results);
            })
        } catch ({ message }) {
            Feedback(message, 'error')
        }
    })()
}


module.exports = ListContacts
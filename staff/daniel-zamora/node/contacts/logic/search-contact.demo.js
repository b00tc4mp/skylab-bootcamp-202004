const searchContacts = require('./search-contact')
const Feedback = require('../components/Feedback')

searchContacts('dani', (error, results)=>{
    if (error) return Feedback(error.message, 'error')
    console.table(results)
})


const searchContacts = require('./search-contacts')
const Feedback = require ('../components/Feedback')

searchContacts('DONALD',(error, searchResults) =>{

    // const {name, surname}= searchResults
    if(searchResults) for(let result of searchResults) console.log(result)
    
})
const addContacts = require('./add-contact')


const contact = {
    name: 'jorge',
    surname: 'genove', 
    email: 'jorge@genove.com', 
    phone: '645747485', 
    birthdate: '10/10/2010', 
    country: 'Russia'
}
 
addContacts('1590220639231-0.3735016327573506',contact, console.log)
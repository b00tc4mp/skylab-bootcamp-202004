
const listContacts = require('../logic/list-contacts')


function ListContacts() {
    listContacts((error, data) => {
        if(error) console.log(error)

        // console.log(data)
        console.table(data)
        // console.log('Name   |   Surname   |         E-mail          |   Phone   |   Age    |   Birthdate')
    
        // data.map(({name,surname,email,phone,age,birthdate}) => {
        //     console.log(`${name}    |   ${surname}  |   ${email}    |   ${phone}    |   ${age}  |   ${birthdate}`)
        // })  
    })
    
}
    // console.log('Name   |   Surname   |         E-mail          |   Phone   |   Age    |   Birthdate')
    
    // Contacts.map(({name,surname,email,phone,age,birthdate}) => {
    //     console.log(`${name}    |   ${surname}  |   ${email}    |   ${phone}    |   ${age}  |   ${birthdate}`)
    // }) 
    // contacts.forEach(element => {
    //     let {name, surname, email, phone, age, birthdate} = element
    //     console.log(`${name}    |   ${surname}  |   ${email}    |   ${phone}    |   ${age}  |   ${birthdate}`)
    // });

module.exports = ListContacts
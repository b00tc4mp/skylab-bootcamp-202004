const AddContact = require('./AddContact')
const ListContacts = require('./ListContacts')
const SearchContacts = require('./SearchContacts')
const Landing = require('./Landing')

function App(){
    console.log('========')
    console.log('Contacts')
    console.log('========');


    (function loop(){
        Landing((error, option) =>{
            if (error) return console.log(error.message)

            if(option === 'add contact')
                AddContact(error =>{

                    loop()
                })
            else if(option === 'list contacts')
                ListContacts(error =>{
                    if(error) return console.log(error.message)

                    loop()
                })
            else if(option === 'search contacts')
                SearchContacts(error =>{
                    if(error) return console.log(error.message)

                    loop()
                })
        })
    })()
}

module.exports = App
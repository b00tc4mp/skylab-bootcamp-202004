const AddContact = require('./AddContact')
const ListContacts = require('./ListContacts')
const Landing = require('./Landing')
const Feedback = require('./Feedback')
const style = require('./App.style')
const SearchContacts= require("./SearchContacts")

//module.exports = () => AddContact(error => !error && ListContacts(() => {}))
module.exports = () => {
    console.log(style.color, '========')
    console.log(style.color, 'Contacts')
    console.log(style.color, '========');

    (function loop() {
        Landing((error, option) => {
            if (error) return Feedback(error.message, 'error')
        
            if (option === 'add contact')
                AddContact(error => {
                    //if (error) return Feedback(error.message, 'error')
        
                    loop()
                })
            else if (option === 'list contacts')
                ListContacts(error => {
                    if (error) return Feedback(error.message, 'error')
        
                    loop()
                })
            else if(option==="search contacts"){
                SearchContacts(error=>{
                    //if(error) return Feedback(error.message,"error")
                    loop()
                })
            }
        })
    })()
}
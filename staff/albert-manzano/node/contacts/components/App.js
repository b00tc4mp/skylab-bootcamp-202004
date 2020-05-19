const AddContact = require('./AddContact')
const ListContacts = require('./ListContacts')
const SearchContacts = require('./SearchContacts')
const Landing = require('./Landing')
const Feedback = require('./Feedback')
const style = require('./App.style')

AddContact(() => {
    console.log(style.color, '========')
    console.log(style.color, 'Contacts')
    console.log(style.color, '========');
    debugger

    (function loop() {
        debugger
        Landing((error, option) => {
            if (error) return Feedback(error.message, 'error')

            if (option === 'add contact')
                AddContact(error => {
                    //if (error) return Feedback(error.message, 'error')

                    loop()
                })
            else if (option === 'list contacts')
                ListContacts(error => {
                    // if (error) return Feedback(error.message, 'error')

                    loop()
                })

            else if (option === 'search contacts')
                SearchContacts(error => {
                    // if (error) return Feedback(error.message, 'error')

                    loop()
                })
        })
    })()
}

)
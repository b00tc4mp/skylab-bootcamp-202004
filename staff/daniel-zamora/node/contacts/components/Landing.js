const readline = require('readline')
const Feedback = require('./Feedback')
const style = require('./Landing.style')

function AddContact(callback) {
    console.log(style.color, '=======')
    console.log(style.color, 'Landing')
    console.log(style.color, '=======')

    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    (function chooseAnOption() {
        console.log(style.color)
        interface.question(`Choose an option:
- add contact
- list contacts
- search
- exit
`, value => {
            if(value.trim() === 'exit') {
                Feedback ('bye bye', 'success')
                interface.close()
            } else if (value.trim() !== 'add contact' && value.trim() !== 'list contacts' && value.trim() !== 'search') {
                Feedback('invalid option', 'error')

                chooseAnOption()
            } else {
                interface.close()
                
                callback(null, value)
            }
        })
    })()
}

module.exports = AddContact
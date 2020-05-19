const readline = require('readline')
const Feedback = require('./Feedback')
const style = require('./Landing.style')

function Landing(callback) {
    console.log(style.color, '===========')
    console.log(style.color, 'Landing')
    console.log(style.color, '===========')

    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })


    (function chooseAnOption() {
        const field = fields[count]

        interface.question(`Choose an option:
    - add contact
    - list contacts
        `, value => {
            if (value !== 'add contact' || value !== 'list contacts') {
                Feedback('invalid option', 'error')

                chooseAnOption()
            } else callback(null, value)
        })
    })()
}

module.exports = AddContact
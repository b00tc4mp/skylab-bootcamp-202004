const readline = require('readline')

function Landing(callback) {
    console.log('=======')
    console.log('Landing')
    console.log('=======')

    const prompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    (function chooseAnOption() {
        prompt.question(`Choose an option:
-add contact
-list contacts
-search contacts
`, value => {
            if (value.trim() !== 'add contact' && value.trim() !== 'list contacts' && value.trim() !== 'search contacts') {
                console.log('invalid option')

                chooseAnOption()
            } else {
                prompt.close()

                callback(null, value)
            }
        })
    })()
}

module.exports = Landing
const readline = require('readline')
const addContact = require('../logic/add-contact')


function AddContact(callback){


    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const fields = ['name', 'surname', 'email', 'phone', 'birth', 'country']
    let count = 0
    const contact = {}
    function askQuestions(){
        let currentQuestion = fields[count]
        interface.question(`${currentQuestion}?`, answer=>{
            contact[currentQuestion] = answer
            //Ask about error?
            count++
            if(count < fields.length){
                askQuestions()
            }
            else{
                interface.close()
                try{
                    addContact(contact, error=>{
                        if (error) console.error('Could not add the contact :(')
                        
                        callback()
                    })
                }catch(error){
                    console.error(error.message)
                }
            }
        })
    }
    askQuestions()
}
module.exports = AddContact
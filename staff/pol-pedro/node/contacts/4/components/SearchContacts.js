//Va a poner un panel to wapo de SEARCHCONTACT
//Nos pregunta que contacto queremos buscar
//Llama a la logica
//Imprime en pantalla el contacto que coincide con el valor de busqueda
//Si no lo hay imprime el erro
//te devuelve a Landing

const searchContact = require('../logic/search-contacts')
const style= require("./Feedback.style")
const readline= require("readline")
const Feedback= require("./Feedback")

module.exports=(callback)=>{
    console.log(style.color, '===============')
    console.log(style.color, 'Search Contacts')
    console.log(style.color, '===============')

    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    interface.question("Introduce the e-mail of the contact you want to find:",(answer)=>{
        try{
            searchContact(answer, (error, data) => {
                if(error){
                    Feedback(error.message, 'error')
                    interface.close()
                    return callback(error)
                }
                Feedback(data, null)
                interface.close()
                callback()
            })
        }catch(error){
            Feedback(error.message,"error")
            interface.close()
            callback(error)
        }
    })

    
}
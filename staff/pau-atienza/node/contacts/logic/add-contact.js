const readline = require('readline')
const fs = require('fs')

const addContact = (array, counter = 0, answers = {})=>{
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  const createContact = (array) => {
    prompt.question(`${array[counter]}? `, answer => {
      console.log(`Your answer was: ${answer}`)
  
      answers[array[counter]] = answer.toLowerCase()
      if (counter < array.length){
        createContact(array, ++counter, answers);
      }
      else{
        fs.writeFile(`./data/${answers["name"].toLowerCase()}-${answers["surname"].toLowerCase()}.json`,JSON.stringify(answers), error => {
          if (error) console.error("Failed to write the file")
          console.log("Contact saved")
          prompt.close()
        })
      } 
    })
  }
  createContact(array)
}

module.exports = addContact
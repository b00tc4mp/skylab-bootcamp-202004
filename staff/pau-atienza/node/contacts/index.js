const readline = require('readline')
const fs = require('fs')

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const questions = ["name", "surname", "number", "e-mail", "website",
"instagram", "facebook", "twitter", "tiktok"]

const createContact = (array, counter = 0, answers = {}) => {
  prompt.question(`${array[counter]}? `, answer => {
    console.log(`Your answer was: ${answer}`)

    answers[array[counter]] = answer.toLowerCase()
    if (counter < questions.length){
      createContact(array, ++counter, answers);
    }
    else{
      fs.writeFile(`${answers["name"].toLowerCase()}-${answers["surname"].toLowerCase()}.json`,JSON.stringify(answers), error => {
        if (error) console.error("Failed to write the file")
        console.log("Contact saved")
        prompt.close()
      })
    } 
  })
}

contactQuestions(questions)


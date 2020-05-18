const readline = require('readline')

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

prompt.question('What do you think of Node.js? ', answer => {
  console.log(`Thank you for your valuable feedback: ${answer}`)

  prompt.close()
})
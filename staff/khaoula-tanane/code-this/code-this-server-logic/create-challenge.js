require('code-this-commons/polyfills/string')
const { models: { Challenge } } = require('code-this-data')

module.exports = (description, solution, difficulty, tests, score) => {
    String.validate.notVoid(description)
    String.validate.notVoid(solution)

    return (async () => {
try {
    await Challenge.create({ description, solution, difficulty, tests })
} catch (error) {
    console.log(error)
}    

})()
 
} 
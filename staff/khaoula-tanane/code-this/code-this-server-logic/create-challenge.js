require('code-this-commons/polyfills/string')
const { models: { Challenge } } = require('code-this-data')

module.exports = (description, difficulty, tests, initialCode) => {
    String.validate.notVoid(description)

    return (async () => {
try {
    await Challenge.create({ description, difficulty, tests, initialCode })
} catch (error) {
    console.log(error)
}    

})()
 
} 
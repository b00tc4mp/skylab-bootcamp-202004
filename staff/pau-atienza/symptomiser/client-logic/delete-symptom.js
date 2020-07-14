/**
 * Deletes asymptom from the submitted symptoms in the context storage.
 * 
 * @param {string} name the name of the term that needs to be deleted.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If the symptom is not present in the submitted symptoms list.
 */

const context = require('./context')
require('commons/polyfills/string')

module.exports =  function(name){
    String.validate.notVoid(name)

    const symptomList = JSON.parse(this.storage.submittedSymptoms)

    const index = symptomList.findIndex(item=>item.term.name===name)

    index !== -1 && symptomList.splice(index, 1)
    if(index === -1) throw new Error("This symptom does not exist")

    this.storage.submittedSymptoms = JSON.stringify(symptomList)

    return symptomList
}.bind(context)
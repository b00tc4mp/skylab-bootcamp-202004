require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/number')
require('takemytask-commons/polyfills/object')

const { utils: { Email, call }} = require('takemytask-commons')
const context = require('./context')


module.exports = function (name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobArray, workingDistance) {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    String.validate.notVoid(bankAcount)
    String.validate.notVoid(description)
    Number.validate.integer(pricingHour)
    Object.validate(jobArray)
    Number.validate.integer(workingDistance)


       return call(
        'POST', 
        `${this.API_URL}/worker`, 
        `{"name":"${name}", 
        "surname":"${surname}", 
        "email":"${email}", 
        "password":"${password}", 
        "adress":"${adress}", 
        "bankAcount":"${bankAcount}", 
        "presentation":"${presentation}",
        "description":"${description}", 
        "pricingHour":${pricingHour}, 
        "jobCategories":${JSON.stringify(jobArray)}, 
        "workingDistance":${workingDistance}}`,
            {'Content-Type':'application/json'}) 
            .then( ({status, body}) => {
    
                if (status === 201) return 
                
                const { error } = JSON.parse(body)

                throw new Error (error)
            })
}.bind(context)
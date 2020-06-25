const { handleError } = require('../../helpers')
const { registerWorker } = require('takemytask-server-logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance } } = req
    
    try {
        registerWorker(name, surname, email, password, adress, bankAcount, description, presentation, pricingHour, jobCategories, workingDistance)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}  
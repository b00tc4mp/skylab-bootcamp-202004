require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
require('takemytask-commons/polyfills/number')
const { utils: { Email }, errors: { DuplicityError } } = require('takemytask-commons')
const { models: { Worker } } = require('takemytask-data')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, email, password, adress, bankAcount, description, pricingHour, jobCategories, workingDistance,) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    String.validate.notVoid(bankAcount)
    String.validate.notVoid(description)
    Number.validate.integer(pricingHour)
    String.validate.notVoid(jobCategories)
    Number.validate.integer(workingDistance)

    return (async () => {
        const worker = await Worker.findOne({ email })

        if (worker) throw new DuplicityError(`user with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await Worker.create({ name, surname, email, password: hash, adress, bankAcount, description, pricingHour, jobCategories, workingDistance })
    })()
}
require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/json')
const { utils: { Email, NIF }, errors: { DuplicityError }} = require('qrmenu-commons')
const { models: {Establishment} } = require('qrmenu-data')
const bcrypt = require('bcryptjs')

/**
 * 
 * @param {string} establishment name of the establishment
 * @param {string} nif nif of the establishment
 * @param {string} email email of the worker(owner)
 * @param {string} password password of the worker(owner)
 */

module.exports = (establishment, nif, email, password) => {
    String.validate.notVoid(establishment)
    String.validate.notVoid(nif)
    NIF.validate(nif)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async() => {
        
        const _establishment = await Establishment.findOne({ nif })
        
        if(_establishment) throw new DuplicityError(`user with nif ${nif} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await Establishment.create({ establishment, nif, staff: [{email, role: 'owner', password: hash}]})

        return
    })()
}
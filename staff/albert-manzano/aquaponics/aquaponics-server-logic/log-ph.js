/**
 * @param { number } ph Arduino input ph of the water, should be a number.
 * @throws {TypeError } If the input does not correspont a number.
 */

const { models: { Ph } } = require('aquaponics-data')
require('aquaponics-commons/polyfills/number')

module.exports = (ph) => {

    Number.validate(ph)
    const date = new Date
    return Ph.create({ ph, date })
        .then(() => { })
}

/**
 * @promise returns:
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 * @return {then}  empty if it was a succes.
 */
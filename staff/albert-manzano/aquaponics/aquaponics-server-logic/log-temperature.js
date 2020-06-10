/**
 * @param { number } temperature Arduino input temperature of the water, should be a number.
 * @throws {TypeError } If the input does not correspont a number.
 */

const { models: { Temperature } } = require('aquaponics-data')
require('aquaponics-commons/polyfills/number')

module.exports = (temperature) => {

    Number.validate(temperature)
    const date = new Date
    return Temperature.create({ temperature, date })
        .then(() => { })
}

/**
 * @promise returns:
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 * @return {then}  empty if it was a succes.
 */
require('escape-me-commons/polyfills/string')
require('escape-me-commons/polyfills/number')

const { utils: { call }, errors: { UnexistenceError } } = require('escape-me-commons')

const context = require('./context')

module.exports = function (query = '', { moreThanPriceMin, lessThanPriceMin, moreThanPriceMax, lessThanPriceMax, moreThanPlayersMin, lessThanPlayersMin, moreThanPlayersMax, lessThanPlayersMax, genre, difficulty, moreThanRating, lessThanRating }) {
    if (query) String.validate.notVoid(query)

    if (arguments.length > 1 && !typeof arguments[1] === 'object') throw new TypeError('second argument must be an instance of object')
    else if (arguments.length < 2) throw new Error('invalid arguments introduced')

    const body = {}

    if (moreThanPriceMin) {
        Number.validate.positive(moreThanPriceMin)
        body['moreThanPriceMin'] = moreThanPriceMin
    }
    if (lessThanPriceMin) {
        Number.validate.positive(lessThanPriceMin)
        body['lessThanPriceMin'] = lessThanPriceMin
    }

    if (moreThanPriceMax) {
        Number.validate.positive(moreThanPriceMax)
        body['moreThanPriceMax'] = moreThanPriceMax
    }
    if (lessThanPriceMax) {
        Number.validate.positive(lessThanPriceMax)
        body['lessThanPriceMax'] = lessThanPriceMax
    }

    if (moreThanPlayersMin) {
        Number.validate.positive(moreThanPlayersMin)
        body['moreThanPlayersMin'] = moreThanPlayersMin
    }
    if (lessThanPlayersMin) {
        Number.validate.positive(lessThanPlayersMin)
        body['lessThanPlayersMin'] = lessThanPlayersMin
    }

    if (moreThanPlayersMax) {
        Number.validate.positive(moreThanPlayersMax)
        body['moreThanPlayersMax'] = moreThanPlayersMax
    }
    if (lessThanPlayersMax) {
        Number.validate.positive(lessThanPlayersMax)
        body['lessThanPlayersMax'] = lessThanPlayersMax
    }
    if (genre && genre instanceof Array) {
        genre.forEach(item => String.validate.notVoid(item))
        body['genre'] = genre
    }
    if (difficulty && genre instanceof Array) {
        difficulty.forEach(item => Number.validate.positive(item))
        body['difficulty'] = difficulty
    }

    if (moreThanRating) {
        Number.validate.positive(moreThanRating)
        body[moreThanRating] = moreThanRating
    }
    if (lessThanRating) {
        Number.validate.positive(lessThanRating)
        body[lessThanRating] = lessThanRating
    }
    return call('POST', `${this.API_URL}/escape/search/${query ? query : ''}`,
        JSON.stringify(body),
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new UnexistenceError(error)
            }
        })
}.bind(context)
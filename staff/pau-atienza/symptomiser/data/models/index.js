const { model } = require('mongoose')
const { term } = require('./schemas')

module.exports = {
    Term: model('Term', term)
}
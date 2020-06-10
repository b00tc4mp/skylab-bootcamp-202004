const { model } = require('mongoose')
const { term, admin } = require('./schemas')

module.exports = {
    Term: model('Term', term),
    Admin: model('Admin', admin)
}
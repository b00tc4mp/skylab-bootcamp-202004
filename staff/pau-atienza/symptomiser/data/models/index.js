const { model } = require('mongoose')
const { term, admin, predictorInput, predictorOutput, predictorItem } = require('./schemas')

module.exports = {
    Term: model('Term', term),
    Admin: model('Admin', admin),
    PredictorInput: model('PredictorInput', predictorInput),
    PredictorOutput: model('PredictorOutput', predictorOutput),
    PredictorItem: model('PredictorItem', predictorItem)
}
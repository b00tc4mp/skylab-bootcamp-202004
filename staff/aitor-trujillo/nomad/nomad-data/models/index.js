const { model } = require('mongoose')
const schemas = require('./schemas')

module.exports = {
    User: model('User', schemas.user),
    Workspace: model('Workspace', schemas.workspace)
}
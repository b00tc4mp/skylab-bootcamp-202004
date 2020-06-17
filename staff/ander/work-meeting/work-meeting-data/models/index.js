const { model } = require('mongoose')
const { user, workGroup, summary, meeting ,department, petition,participant} = require('./schemas')

module.exports = {
    User: model('User', user),
    WorkGroup: model('WorkGroup', workGroup),
    Summary: model('Summary', summary),
    Meeting: model('Meeting', meeting),
    Department: model('Department', department),
    Petition: model('Petition', petition),
    Participant: model('Participant', participant)
}
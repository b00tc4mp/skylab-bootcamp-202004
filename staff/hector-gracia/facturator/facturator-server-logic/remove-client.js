require('facturator-commons/polyfills/string')

const { mongoose:{ObjectId},models: { Client } } = require('facturator-data')
const {  errors: { UnexistenceError } } = require('facturator-commons')

module.exports = (clientId) => {
    String.validate.notVoid(clientId)

    return (async () => {
        client= await Client.findOne({ _id:ObjectId(clientId)})
        if(!client) throw new UnexistenceError(`client with id ${clientId} does not exist`)
        await await Client.deleteOne({_id:ObjectId(clientId)})
    })()
}
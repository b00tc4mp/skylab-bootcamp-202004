require('facturator-commons/polyfills/string')

const { mongoose:{ObjectId},models: { Client } } = require('facturator-data')
const {  errors: { UnexistenceError } } = require('facturator-commons')

module.exports = (clientId) => {
    String.validate.notVoid(clientId)

    return (async () => {
        client= await Client.findOne({ _id:ObjectId(clientId)},{__v:0}).lean()
        if(!client) throw new UnexistenceError(`client with id ${clientId} does not exist`)
        client.id= client._id.toString()
        delete client._id
        return client
    })()
}
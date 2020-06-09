require('facturator-commons/polyfills/string')

const { models: { Client } } = require('facturator-data')

module.exports = () => {
    return (async () => {
        const clients= await Client.find({},{__v:0}).lean()
        const result= clients.map((client)=>{
            client.id=client._id.toString()
            delete client._id
            delete client.discounts
            return client
        })
        return result
    })()
}
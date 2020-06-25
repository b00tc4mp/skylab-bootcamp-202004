require('facturator-commons/polyfills/string')

const { models: { Template } } = require('facturator-data')

module.exports = () => {
    return (async () => {
        const templates= await Template.find({},{__v:0}).lean()
        const result= templates.map((template)=>{
            template.id=template._id.toString()
            delete template._id
            delete template.products
            return template
        })
        return result
    })()
}
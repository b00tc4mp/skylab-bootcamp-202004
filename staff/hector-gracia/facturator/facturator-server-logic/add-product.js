require('facturator-commons/polyfills/string')
const { models: { Product } } = require('facturator-data')

module.exports = (newProduct) => {
    if(typeof newProduct!== "object") throw new TypeError(newProduct+=" is not an object")
    const{name,description,price,tax,alergens}= newProduct

    String.validate.notVoid(name)
    if(typeof price!== "number") throw new TypeError(price+" is not a number")
    if(description)
        String.validate.notVoid(description)
    if(tax)
        if(typeof tax!=="number") throw new TypeError(tax+" is not a number")
    if(alergens)
        alergens.forEach(alergen => {
            String.validate(alergen)
        })
    return (async () => {
        await Product.create({ name, description,price,tax,alergens})
    })()
}
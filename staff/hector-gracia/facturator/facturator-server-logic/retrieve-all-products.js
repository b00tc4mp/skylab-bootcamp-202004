require('facturator-commons/polyfills/string')

const { models: { Product } } = require('facturator-data')

module.exports = () => {

    return (async () => {
        const products= await Product.find({},{__v:0}).lean()
        const results= products.map((product)=>{
            product.id=product._id.toString()
            delete product._id
            return product
        })
        return results
    })()
}
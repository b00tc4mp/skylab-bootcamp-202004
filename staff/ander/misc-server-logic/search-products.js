require('misc-commons/polyfills/string')
require('misc-commons/polyfills/json')
require('misc-commons/polyfills/number')
const {errors: { UnexistenceError } } = require('misc-commons')
const { mongo } = require('misc-data')

module.exports = (query) =>{
    String.validate.notVoid(query)


    return mongo.connect()
        .then(connection=>{ 
            const db = connection.db()
            
            const products = db.collection('products')

            return products.find({
            $or: [
                { name: new RegExp(query, 'i') },
                { description: new RegExp(query, 'i') }
            ]
            }).toArray()
        })
        .then(_products=>{
            if(_products.length === 0) throw  new UnexistenceError ('not found any results')

            _products.forEach(product => {
                product.id= product._id.toString()
                delete product._id
                
            });
            debugger
            return _products
        })

}

// return products.find().toArray()
// .then(_products => {
                           
//     if (query) _products = _products.filter(product =>product.name.includes(query.toLowerCase()))
                
//     return _products
// })                 

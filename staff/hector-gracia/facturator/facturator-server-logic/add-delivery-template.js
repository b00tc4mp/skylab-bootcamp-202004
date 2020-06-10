require("facturator-commons/polyfills/string")
const {errors:{UnexistenceError}}= require("facturator-commons")
const{mongoose:{ObjectId},models:{Product,Template}}= require("facturator-data")
module.exports=(template)=>{
    if(typeof template!=="object") throw new TypeError(template+" is not an object")
    const{name,products}= template
    String.validate.notVoid(name)
    if(!Array.isArray(products)) throw new TypeError(products+" is not an array")
    return (async()=>{
        for(let i=0;i<products.lenght;i++){// It's not entering the for, asincronous probleam
            const productDb= await Product.find({_id:ObjectId(products[i].product)})
            if(!productDb) throw new UnexistenceError(`product with id ${products[i].product} does not exist`)
            if(typeof products[i].quantity!=="number") throw new TypeError(products[i].quantity+" is not a number")
        }
        await Template.create({name,products})
    })()
}
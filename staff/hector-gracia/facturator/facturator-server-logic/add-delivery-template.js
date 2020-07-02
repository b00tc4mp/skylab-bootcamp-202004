require("facturator-commons/polyfills/string")
const {errors:{UnexistenceError}}= require("facturator-commons")
const{mongoose:{ObjectId},models:{Product,Template}}= require("facturator-data")
module.exports=(name)=>{ //Now works by creating an empty delivery an then you add or substract products of that delivery
    String.validate.notVoid(name)
    return (async()=>{
        await Template.create({name,products:[]})
    })()
}
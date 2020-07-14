require("facturator-commons/polyfills/string")
const {errors:{UnexistenceError}}= require("facturator-commons")
const{mongoose:{ObjectId},models:{Template}}= require("facturator-data")
module.exports=(templateId)=>{
    String.validate.notVoid(templateId)
    return (async()=>{
        const template = await Template.findOne({ _id:ObjectId(templateId)},{__v:0}).populate({
            path:"products",
            populate:{
                path:"product",
                model:"Product"
            }
        }).lean()
        if(!template) throw new UnexistenceError(`template with id ${templateId} does not exist`)
        
        return sanitize(template)
    })()
}
const sanitize=(template)=>{
    const result={}
    result.id= template._id.toString()
    result.name=template.name
    result.products= []
    for(let i=0;i<template.products.length;i++){
        let productQuantity={}
        productQuantity.id=template.products[i]._id.toString()
        productQuantity.quantity= template.products[i].quantity
        let product={}
        product.id=template.products[i].product._id.toString()
        product.name=template.products[i].product.name
        product.price=template.products[i].product.price//TODO Test should expect price and description
        productQuantity.product=product
        result.products.push(productQuantity)
    }
    return result
}
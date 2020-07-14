const { mongoose } = require('..')
const { Client,Product,Delivery} = require('.')
let clientId, productId

mongoose.connect('mongodb://localhost/facturator-test')
    .then(() => Client.create({ name: 'Cristina',establishment:"Chuches Cristy",contactNumber:948089958, email: 'chuchescristy@gmail.com',paymentMethod:"Efectivo / Diario"}))
    .then((client) => { 
        clientId=client._id
        return Product.create({name:"Grande larga",description:"Barra de pan de 310g",price:1.10,alergens:["trigo"]}) })
    .then(product=>{
        productId=product._id
        return Delivery.create({client:clientId,products:[{product:productId,quantity:5}],amount:5.50,payed:false})
    })
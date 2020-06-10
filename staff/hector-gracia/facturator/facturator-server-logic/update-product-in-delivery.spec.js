require("dotenv").config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const updateProductInDelivery = require('./update-product-in-delivery')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { Client,Delivery,Product } } = require('facturator-data')
const {errors:{UnexistenceError}}= require("facturator-commons")

describe("updateProductInDelivery",()=>{
    before(()=>{mongoose.connect(MONGODB_URL)})
    //Client
    let clientName, clientEstablishment, clientContactNumber, clientEmail, clientDirection, clientPaymentMethod, clientPaymentInfo, clientId
    //Product
    let productName, productDescription, productPrice,productTax, productAlergens, productId
    let productName2, productDescription2, productPrice2,productTax2, productAlergens2, productId2
    let productQuantity,productQuantityId, productQuantity2
    //Delivery
    let deliveryId

    beforeEach(async()=>{
        await Client.deleteMany()
        await Delivery.deleteMany()
        await Product.deleteMany()
        //Client
        clientName = `clientName-${random()}`
        clientEstablishment = `establishment-${random()}`
        clientContactNumber= random()
        clientEmail = `e-${random()}@mail.com`
        clientDirection=`direction-${random()}`
        clientPaymentMethod=`paymentMethod-${random()}`
        clientPaymentInfo=`paymentInfo-${random()}`
        const client= await Client.create({name:clientName, establishment:clientEstablishment,contactNumber: clientContactNumber,email:clientEmail,direction:clientDirection,paymentMethod:clientPaymentMethod,paymentInfo:clientPaymentInfo})
        clientId= client._id.toString()
        //Product
        productName = `productName-${random()}`
        productDescription= `description-${random()}`
        productPrice= random()
        productTax= random()
        productAlergens=[]
        for(let i = 0; i < Math.floor(random()*4);i++){
            productAlergens.push(`alergen-${random()}`)
        }
        const product= await Product.create({name:productName,description:productDescription,price:productPrice,tax:productTax,alergens:productAlergens})
        productId= product._id.toString()
        productQuantity={}
        productQuantity.product=productId
        productQuantity.quantity= Math.floor(random()*10)

        productName2 = `productName-${random()}`
        productDescription2= `description-${random()}`
        productPrice2= random()
        productTax2= random()
        productAlergens2=[]
        for(let i = 0; i < Math.floor(random()*4);i++){
            productAlergens2.push(`alergen-${random()}`)
        }
        const product2= await Product.create({name:productName2,description:productDescription2,price:productPrice2,tax:productTax2,alergens:productAlergens2})
        productId2= product2._id.toString()
        productQuantity2={}
        productQuantity2.product=productId
        productQuantity2.quantity= Math.floor(random()*10)
        //Delivery
        const delivery= await Delivery.create({client:client._id,products:productQuantity,amount:0,paid:false})
        deliveryId= delivery._id.toString()
        productQuantityId=delivery.products[0]._id.toString()
    })
    it("should update the quantity of a given product in a delivery",async()=>{
        const newQuantity= Math.floor(random()*10)
        const newProductQuantity={product:productQuantity.product, quantity: newQuantity}
        const result= await updateProductInDelivery(deliveryId,productQuantityId, newProductQuantity)
        expect(result).to.be.undefined
        const deliveries= await Delivery.find()
        expect(deliveries).to.exist
        expect(deliveries.length).to.equal(1)
        const [delivery]= deliveries
        expect(delivery.client.toString()).to.equal(clientId)
        expect(delivery.products).to.be.instanceOf(Array)
        expect(delivery.products.length).to.equal(1)
        expect(delivery.products[0].quantity).to.equal(newQuantity)
        expect(delivery.products[0].product.toString()).to.equal(productQuantity.product)
        expect(delivery.products[0].product.toString()).to.equal(newProductQuantity.product)
    })
    it("should update the product of the delivery",async()=>{
        const newProductQuantity={product:productQuantity2.product, quantity: productQuantity.quantity}
        const result= await updateProductInDelivery(deliveryId,productQuantityId, newProductQuantity)
        expect(result).to.be.undefined
        const deliveries= await Delivery.find()
        expect(deliveries).to.exist
        expect(deliveries.length).to.equal(1)
        const [delivery]= deliveries
        expect(delivery.client.toString()).to.equal(clientId)
        expect(delivery.products).to.be.instanceOf(Array)
        expect(delivery.products.length).to.equal(1)
        expect(delivery.products[0].quantity).to.equal(productQuantity.quantity)
        expect(delivery.products[0].quantity).to.equal(newProductQuantity.quantity)
        expect(delivery.products[0].product.toString()).to.equal(newProductQuantity.product)
    })
    it("should update both the product and the quantity",async()=>{
        const result= await updateProductInDelivery(deliveryId,productQuantityId, productQuantity2)
        expect(result).to.be.undefined
        const deliveries= await Delivery.find()
        expect(deliveries).to.exist
        expect(deliveries.length).to.equal(1)
        const [delivery]= deliveries
        expect(delivery.client.toString()).to.equal(clientId)
        expect(delivery.products).to.be.instanceOf(Array)
        expect(delivery.products.length).to.equal(1)
        expect(delivery.products[0].quantity).to.equal(productQuantity2.quantity)
        expect(delivery.products[0].product.toString()).to.equal(productQuantity2.product)
    })
    it("should return an error when trying to update a delivery that does not exist",async()=>{
        const id= mongoose.ObjectId().toString()
        let error
        try {
            await updateProductInDelivery(id,productQuantityId,productQuantity2)
        } catch (_error) {
            error=_error
        }
        expect(error).to.exist
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`delivery with id ${id} does not exist`)
    })
    it("should return an error when trying to update an entry that does not exist",async()=>{
        const id= mongoose.ObjectId().toString()
        let error
        try {
            await updateProductInDelivery(deliveryId,id,productQuantity2)
        } catch (_error) {
            error=_error
        }
        expect(error).to.exist
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`entry with id ${id} does not exist`)
    })
    it("should return an error when trying to update with a product that does not exist", async()=>{
        const id= mongoose.ObjectId().toString()
        productQuantity2.product=id
        let error
        try {
            await updateProductInDelivery(deliveryId,productQuantityId,productQuantity2)
        } catch (_error) {
            error=_error
        }
        expect(error).to.exist
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`product with id ${id} does not exist`)
    })
    it("should throw an error when not given ids",()=>{
        expect(()=>{updateProductInDelivery()}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{updateProductInDelivery(deliveryId)}).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when not given an object with the new entry",()=>{
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId)}).to.throw(TypeError,"undefined is not an object")
    })
    it("should throw an error when called with the wrong format",()=>{
        expect(()=>{updateProductInDelivery(123,productQuantityId,productQuantity2)}).to.throw(TypeError,"123 is not a string")
        expect(()=>{updateProductInDelivery(false,productQuantityId,productQuantity2)}).to.throw(TypeError,"false is not a string")
        expect(()=>{updateProductInDelivery([],productQuantityId,productQuantity2)}).to.throw(TypeError," is not a string")
        expect(()=>{updateProductInDelivery({},productQuantityId,productQuantity2)}).to.throw(TypeError,"[object Object] is not a string")
        expect(()=>{updateProductInDelivery(deliveryId,undefined,productQuantity2)}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{updateProductInDelivery(deliveryId,123,productQuantity2)}).to.throw(TypeError,"123 is not a string")
        expect(()=>{updateProductInDelivery(deliveryId,false,productQuantity2)}).to.throw(TypeError,"false is not a string")
        expect(()=>{updateProductInDelivery(deliveryId,[],productQuantity2)}).to.throw(TypeError," is not a string")
        expect(()=>{updateProductInDelivery(deliveryId,{},productQuantity2)}).to.throw(TypeError,"[object Object] is not a string")
        productQuantity2.product=undefined
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId,productQuantity2)}).to.throw(TypeError,"undefined is not a string")
        productQuantity2.product=123
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId,productQuantity2)}).to.throw(TypeError,"123 is not a string")
        productQuantity2.product=false
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId,productQuantity2)}).to.throw(TypeError,"false is not a string")
        productQuantity2.product=productQuantity.product
        productQuantity2.quantity=undefined
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId,productQuantity2)}).to.throw(TypeError,"undefined is not a number")
        productQuantity2.quantity="string"
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId,productQuantity2)}).to.throw(TypeError,"string is not a number")
        productQuantity2.quantity=false
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId,productQuantity2)}).to.throw(TypeError,"false is not a number")
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId,undefined)}).to.throw(TypeError,"undefined is not an object")
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId,123)}).to.throw(TypeError,"123 is not an object")
        expect(()=>{updateProductInDelivery(deliveryId,productQuantityId,"string")}).to.throw(TypeError,"string is not an object")
    })

    afterEach(async()=>{
        await Client.deleteMany()
        await Delivery.deleteMany()
        await Product.deleteMany()
    })
    after(mongoose.disconnect)
})


//No id
//No object
//Bad format
require("dotenv").config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const removeProductFromDeliveryTemplate = require('./remove-product-from-delivery-template')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { Template,Product } } = require('facturator-data')
const {errors:{UnexistenceError}}= require("facturator-commons")

describe("removeProductFromDeliveryTemplate",()=>{
    before(()=>mongoose.connect(MONGODB_URL))
    //Product
    let productName, productDescription, productPrice,productTax, productAlergens, productId
    let productQuantity,productQuantityId
    //Template
    let templateId, templateName
    beforeEach(async()=>{
        await Product.deleteMany()
        await Template.deleteMany()
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
        //Template
        templateName=`tempName-${random()}`
        const template = await Template.create({name:templateName,products:productQuantity})
        templateId= template._id.toString()
        productQuantityId= template.products[0]._id.toString()
    })
    it("should remove an entry from a delivery template",async()=>{
        const result= await removeProductFromDeliveryTemplate(templateId,productQuantityId)
        expect(result).to.be.undefined
        const templates= await Template.find()
        expect(templates).to.exist
        expect(templates.length).to.equal(1)
        const [template]= templates
        expect(template.name).to.equal(templateName)
        expect(template.products).to.be.instanceOf(Array)
        expect(template.products.length).to.equal(0)
    })
    it("should return an error when given a template that does not exist",async()=>{
        const id= mongoose.ObjectId().toString()
        let error 
        try {
            await removeProductFromDeliveryTemplate(id,productQuantityId)
        } catch (_error) {
            error=_error
        }
        expect(error).to.exist
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`template with id ${id} does not exist`)
    })
    it("should return an error when trying to remove an entry that does not exist",async()=>{
        const id= mongoose.ObjectId().toString()
        let error
        try {
            await removeProductFromDeliveryTemplate(templateId,id)
        } catch (_error) {
            error=_error
        }
        expect(error).to.exist
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`entry with id ${id} does not exist`)
    })
    it("should throw an error when not given the template or entry ids",()=>{
        expect(()=>{removeProductFromDeliveryTemplate()}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{removeProductFromDeliveryTemplate(templateId)}).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when the ids are not strings",()=>{
        expect(()=>{removeProductFromDeliveryTemplate(undefined,productQuantityId)}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{removeProductFromDeliveryTemplate(123,productQuantityId)}).to.throw(TypeError,"123 is not a string")
        expect(()=>{removeProductFromDeliveryTemplate(false,productQuantityId)}).to.throw(TypeError,"false is not a string")
        expect(()=>{removeProductFromDeliveryTemplate([],productQuantityId)}).to.throw(TypeError," is not a string")
        expect(()=>{removeProductFromDeliveryTemplate(templateId,undefined)}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{removeProductFromDeliveryTemplate(templateId,123)}).to.throw(TypeError,"123 is not a string")
        expect(()=>{removeProductFromDeliveryTemplate(templateId,false)}).to.throw(TypeError,"false is not a string")
        expect(()=>{removeProductFromDeliveryTemplate(templateId,[])}).to.throw(TypeError," is not a string")
    })
    afterEach(async()=>{
        await Template.deleteMany()
        await Product.deleteMany()
    })
    after(mongoose.disconnect)
})
require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const retrieveDeliveryTemplate= require("./retrieve-delivery-template")
const {random}= Math
const { expect } = require('chai')
const { mongoose, models: { Product,Template } } = require('facturator-data')
require('facturator-commons/ponyfills/xhr')
const {utils:{Rounder:{round}}}= require("facturator-commons")

const context = require('./context')
const template = require('facturator-data/models/schemas/template')

describe("retrieveDeliveryTemplate",()=>{
    before(()=>{mongoose.connect(MONGODB_URL)})
    //Product
    let productName, productDescription, productPrice, productTax, productAlergens, productId
    //Template
    let tempName, tempProducts, quantity, tempId

    beforeEach(async()=>{
        await Product.deleteMany()
        await Template.deleteMany()
        //Products
        productName=`name-${random()}`
        productDescription= `description-${random()}`
        productPrice=random()
        productTax= random()
        productAlergens=[]
        for(let i = 0; i < Math.floor(random()*4);i++){
            productAlergens.push(`alergen-${random()}`)
        }
        quantity=round(random())
        const product= await Product.create({name:productName,description: productDescription, price: productPrice, tax: productTax, alergens: productAlergens})
        productId= product._id.toString()
        //Template
        tempProducts=[]
        tempProducts.push({product: product._id,quantity})
        tempName= `name-${random()}`
        const template= await Template.create({name: tempName, products: tempProducts}) 
        tempId= template._id.toString()
    })
    it("should return the name and products of a given template",()=>{
        return retrieveDeliveryTemplate(tempId)
            .then(template=>{
                expect(template.name).to.equal(tempName)
                expect(template.id).to.equal(tempId)
                expect(template._id).to.be.undefined
                expect(template.products).to.be.instanceOf(Array)
                expect(template.products.length).to.equal(1)
                for(let i=0; i< template.products.length;i++){
                    expect(template.products[i].id).to.exist
                    expect(template.products[i]._id).to.not.exist
                    expect(template.products[i].quantity).to.equal(quantity)
                    expect(template.products[i].product.name).to.equal(productName)
                    expect(template.products[i].product.id).to.equal(productId)
                    expect(template.products[i].product._id).to.not.exist
                }
            })
    })
    it("should return an error when given a template that does not exist",()=>{
        const id= mongoose.ObjectId().toString()
        return retrieveDeliveryTemplate(id)
            .then(()=>{throw new Error()})
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`template with id ${id} does not exist`)
            })
    })
    it("should throw an error when the id is not a string",()=>{
        expect(()=>{retrieveDeliveryTemplate(undefined)}).to.throw(`${undefined} is not a string`)
        expect(()=>{retrieveDeliveryTemplate(123)}).to.throw(`${123} is not a string`)
        expect(()=>{retrieveDeliveryTemplate(false)}).to.throw(`${false} is not a string`)
        expect(()=>{retrieveDeliveryTemplate([])}).to.throw(`${[]} is not a string`)
        expect(()=>{retrieveDeliveryTemplate({})}).to.throw(`${{}} is not a string`)
        expect(()=>{retrieveDeliveryTemplate(()=>{})}).to.throw(`${()=>{}} is not a string`)
    })
    afterEach(async()=>{
        await Product.deleteMany()
        await Template.deleteMany()
    })
    after(mongoose.disconnect)
})
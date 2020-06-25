require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const retrieveAllDeliveryTemplates= require("./retrieve-all-delivery-templates")
const {random}= Math
const { expect } = require('chai')
const { mongoose, models: { Product,Template } } = require('facturator-data')
require('facturator-commons/ponyfills/xhr')
const {utils:{Rounder:{round}}}= require("facturator-commons")

const context = require('./context')

describe("retrieveAllDeliveryTemplates",()=>{
    before(()=>{mongoose.connect(MONGODB_URL)})
    //Product
    let productName, productDescription, productPrice, productTax, productAlergens, productId
    //Template
    let tempName, tempProducts, quantity, tempId, tempName2, tempId2

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
        tempName2= `name-${random()}`
        const template= await Template.create({name: tempName, products: tempProducts}) 
        tempId= template._id.toString()

        const template2= await Template.create({name: tempName2, products: tempProducts}) 
        tempId2= template2._id.toString()
    })
    it("should return all the delivery templates with it's id and name",()=>{
        return retrieveAllDeliveryTemplates()
            .then(templates=>{
                expect(templates.length).to.equal(2)
                expect(templates[0].id).to.equal(tempId)
                expect(templates[0].name).to.equal(tempName)
                expect(templates[1].id).to.equal(tempId2)
                expect(templates[1].name).to.equal(tempName2)
            })
    })
    it("should return an empty array if there are no templates",()=>{
        return Template.deleteMany()
            .then(()=>retrieveAllDeliveryTemplates())
            .then(templates=>{
                expect(templates.length).to.equal(0)
            })
    })
    afterEach(async()=>{
        await Product.deleteMany()
        await Template.deleteMany()
    })
    after(mongoose.disconnect)
})
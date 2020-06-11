require("dotenv").config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const addDeliveryTemplate = require('./add-delivery-template')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { Template,Product } } = require('facturator-data')
const {errors:{UnexistenceError},utils:{Rounder:{round}}}= require("facturator-commons")

describe("addDeliveryTemplate",()=>{
    before(()=>{ mongoose.connect(MONGODB_URL)})

    let name, description, price,tax, alergens, productId
    let quantity, tempName, tempProducts
    let newTemplate={}

    beforeEach(async()=>{
        await Product.deleteMany()
        await Template.deleteMany()
        name = `name-${random()}`
        tempName = `name-${random()}`
        description= `description-${random()}`
        price= random()
        tax= random()
        alergens=[]
        for(let i = 0; i < Math.floor(random()*4);i++){
            alergens.push(`alergen-${random()}`)
        }
        quantity=round(random())
        const product= await Product.create({name,description,price,tax,alergens})
        productId=product._id.toString()
        tempProducts=[]
        tempProducts.push({product:product._id,quantity})
        newTemplate.products=tempProducts
        newTemplate.name= tempName
    })
    it("should create a new delivery template",async()=>{
        const result=await addDeliveryTemplate(newTemplate)
        expect(result).to.be.undefined
        const templates= await Template.find()
        expect(templates).to.exist
        expect(templates.length).to.equal(1)
        const [template]= templates
        expect(template.name).to.equal(newTemplate.name)
        expect(template.products.length).to.equal(newTemplate.products.length)
        for(let i=0;i<newTemplate.products.length;i++){
            expect(template.products[i].quantity).to.equal(newTemplate.products[i].quantity)
            expect(template.products[i].product.toString()).to.equal(newTemplate.products[i].product.toString())
        }
    })
    it("should throw an error whern not given a template",()=>{
        expect(()=>{addDeliveryTemplate()}).to.throw(TypeError,"undefined is not an object")
    })
    it("should throw an error when the template does not match the format",()=>{
        delete newTemplate.name
        expect(()=>{addDeliveryTemplate(newTemplate)}).to.throw(TypeError,"undefined is not a string")
        newTemplate.name=123
        expect(()=>{addDeliveryTemplate(newTemplate)}).to.throw(TypeError,"123 is not a string")
        newTemplate.name=tempName
        delete newTemplate.products
        expect(()=>{addDeliveryTemplate(newTemplate)}).to.throw(TypeError,("undefined is not an array"))
        newTemplate.products= tempProducts
    })
    it("should return an error when the product does not exist",()=>{
        const id = mongoose.ObjectId().toString()
        newTemplate.products[0].product=id;
        
        return (async()=>{
            let error
            try {
                const result=await addDeliveryTemplate(newTemplate)
            } catch (_error) {
                error=_error
            }
            expect(error).to.exist
            expect(error).to.be.instanceOf(UnexistenceError)
            expect(error.message).to.equal(`product with id ${id} does not exist`)
        })()
    })
    it("should return an error if the quantity of a product is not a number",()=>{
        newTemplate.products[0].quantity="string";
        
        return (async()=>{
            let error
            try {
                const result=await addDeliveryTemplate(newTemplate)
            } catch (_error) {
                error=_error
            }
            expect(error).to.exist
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal(`string is not a number`)
        })()
    })



    afterEach(async()=>{
        await Product.deleteMany()
        await Template.deleteMany()
    })
    after(mongoose.disconnect)
})
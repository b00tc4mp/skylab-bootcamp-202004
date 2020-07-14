require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const addProductToDeliveryTemplate= require("./add-product-to-delivery-template")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Template,Product}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const context = require('./context')
context.API_URL = API_URL

describe("addProductToDeliveryTemplate",()=>{
    before(()=>{mongoose.connect(MONGODB_URL)})
    
    //Product
    let productName, productDescription, productPrice,productTax, productAlergens, productId
    let productQuantity
    //Delivery
    let templateId,tempName

    beforeEach(async()=>{
        await Template.deleteMany()
        await Product.deleteMany()
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
        productQuantity.productId=productId
        productQuantity.quantity= Math.floor(random()*10)
        //Template
        tempName=`tempName-${random()}`
        const template= await Template.create({name:tempName,products:[]})
        templateId= template._id.toString()
    })
    it("should add a specified product with a specified quantity to a delivery template",()=>{
        return addProductToDeliveryTemplate(templateId,productQuantity)
            .then((result)=>{
                expect(result).to.be.undefined
                return Template.find()
            })
            .then(templates=>{
                expect(templates).to.exist
                expect(templates.length).to.equal(1)
                const [template]=templates
                expect(template.name.toString()).to.equal(tempName)
                expect(template.products).to.be.instanceOf(Array)
                expect(template.products.length).to.equal(1)
                expect(template.products[0].product.toString()).to.equal(productQuantity.productId)
                expect(template.products[0].quantity).to.equal(productQuantity.quantity)
                //Add again        
                const quantity2= Math.floor(random()*10)
                return addProductToDeliveryTemplate(templateId,{productId,quantity:quantity2})
                .then(()=>Template.find())
                .then(templates2=>{
                    expect(templates2).to.exist
                    expect(templates2.length).to.equal(1)
                    const [template2]= templates2
                    expect(template2.name ).to.equal(tempName)
                    expect(template2.products).to.be.instanceOf(Array)
                    expect(template2.products.length).to.equal(2)
                    expect(template2.products[0].product.toString()).to.equal(productQuantity.productId)
                    expect(template2.products[0].quantity).to.equal(productQuantity.quantity)
                    expect(template2.products[1].product.toString()).to.equal(productId)
                    expect(template2.products[1].quantity).to.equal(quantity2)
                })
            })
    })
    it("should return an error when trying to add a product to a template that does not exist",()=>{
        const id=mongoose.ObjectId().toString()
        return addProductToDeliveryTemplate(id,productQuantity)
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`template with id ${id} does not exist`)        
            })
    })
    it("should return an error when trying to add a product that does not exist to a template",()=>{
        const id=mongoose.ObjectId().toString()
        productQuantity.productId=id
        return addProductToDeliveryTemplate(templateId,productQuantity)
            .catch(error=>{
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`product with id ${id} does not exist`)        
            })
    })
    it("should throw an error when not given the template or the productQuantity",()=>{
        expect(()=>{addProductToDeliveryTemplate()}).to.throw("undefined is not a string")
        expect(()=>{addProductToDeliveryTemplate(templateId)}).to.throw("undefined is not an object")
    })
    it("should throw an error when the parameters don't match the format",()=>{
        expect(()=>{addProductToDeliveryTemplate(123,productQuantity)}).to.throw("123 is not a string")
        expect(()=>{addProductToDeliveryTemplate([],productQuantity)}).to.throw(" is not a string")
        expect(()=>{addProductToDeliveryTemplate({},productQuantity)}).to.throw("[object Object] is not a string")
        expect(()=>{addProductToDeliveryTemplate(templateId,"string")}).to.throw("string is not an object")
        expect(()=>{addProductToDeliveryTemplate(templateId,[])}).to.throw("undefined is not a string")
        expect(()=>{addProductToDeliveryTemplate(templateId,123)}).to.throw("123 is not an object")
        productQuantity.productId=123
        expect(()=>{addProductToDeliveryTemplate(templateId,productQuantity)}).to.throw("123 is not a string")
        productQuantity.productId="123"
        productQuantity.quantity="string"
        expect(()=>{addProductToDeliveryTemplate(templateId,productQuantity)}).to.throw("string is not a number")
    })
    afterEach(async()=>{
        await Template.deleteMany()
        await Product.deleteMany()
    })
    after(mongoose.disconnect)
})
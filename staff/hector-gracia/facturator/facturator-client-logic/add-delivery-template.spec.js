require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const addDeliveryTemplate= require("./add-delivery-template")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Template,Product}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const {utils:{Rounder:{round}}}= require("facturator-commons")
const context = require('./context')
context.API_URL = API_URL

describe("addDeliveryTemplate",()=>{
    before(()=>{ mongoose.connect(MONGODB_URL)})

    let name

    beforeEach(async()=>{
        await Template.deleteMany()
        name = `name-${random()}`
    })
    it("should create a new delivery template",()=>{
        return addDeliveryTemplate(name)
            .then(result=>{
                expect(result).to.be.undefined
                return Template.find()
            })
            .then(templates=>{
                expect(templates).to.exist
                expect(templates.length).to.equal(1)
                const [template]= templates
                expect(template.name).to.equal(name)
            })
    })
    it("should throw an error whern not given a name",()=>{
        expect(()=>{addDeliveryTemplate()}).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when the name is not a string",()=>{
        expect(()=>{addDeliveryTemplate(undefined)}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{addDeliveryTemplate(123)}).to.throw(TypeError,"123 is not a string")
        expect(()=>{addDeliveryTemplate(true)}).to.throw(TypeError,"true is not a string")
    })
    afterEach(async()=>{
        await Product.deleteMany()
        await Template.deleteMany()
    })
    after(mongoose.disconnect)
})
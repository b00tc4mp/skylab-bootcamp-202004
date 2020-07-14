require("dotenv").config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const addDeliveryTemplate = require('./add-delivery-template')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { Template } } = require('facturator-data')

describe("addDeliveryTemplate",()=>{
    before(()=>{ mongoose.connect(MONGODB_URL)})

    let tempName

    beforeEach(async()=>{
        await Template.deleteMany()
        tempName = `name-${random()}`
    })
    it("should create a new delivery template",async()=>{
        const result=await addDeliveryTemplate(tempName)
        expect(result).to.be.undefined
        const templates= await Template.find()
        expect(templates).to.exist
        expect(templates.length).to.equal(1)
        const [template]= templates
        expect(template.name).to.equal(tempName)
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
        await Template.deleteMany()
    })
    after(mongoose.disconnect)
})
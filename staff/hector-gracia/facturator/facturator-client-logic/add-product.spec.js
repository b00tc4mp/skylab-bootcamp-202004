require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const addProduct= require("./add-product")
const {random}= Math
const { expect } = require('chai')
const {mongoose, models:{Product}}= require("facturator-data")
require('facturator-commons/ponyfills/xhr')
const context = require('./context')

describe("addProduct",()=>{
    before(() => mongoose.connect(MONGODB_URL))

    let name, description, price,tax, alergens, newProduct

    beforeEach(() =>
        Product.deleteMany()
            .then(() => {
                name = `name-${random()}`
                description= `description-${random()}`
                price= random()
                tax= random()
                alergens=[]
                for(let i = 0; i < Math.floor(random()*4);i++){
                    alergens.push(`alergen-${random()}`)
                }
                newProduct={name,description,price,tax,alergens}
            })
    )
    it("should succeed on valid data",()=>{
        return addProduct(newProduct)
            .then(result=>{
                expect(result).to.be.undefined
                return Product.find()
            })
            .then(products=>{
                expect(products.length).to.equal(1)
                const [product] = products
                expect(product.name).to.equal(name)
                expect(product.description).to.equal(description)
                expect(product.price).to.equal(price)
                expect(product.tax).to.equal(tax)
                expect(product.alergens).to.deep.equal(alergens)
            })
    })
    it("should succeed given only the name and the price",()=>{
        const testProduct={name,price}
        return addProduct(testProduct)
            .then(result=>{
                expect(result).to.be.undefined
                return Product.find()
            })
            .then(products=>{
                expect(products.length).to.equal(1)
                const [product]= products
                expect(product.name).to.equal(name)
                expect(product.description).to.be.undefined
                expect(product.price).to.equal(price)
                expect(product.tax).to.equal(0)
                expect(product.alergens).to.deep.equal([])
            })
    })
    it("should throw an error when not given the new product as an object",()=>{
        expect(()=>{addProduct()}).to.throw(TypeError,"undefined is not an object")
    })
    it("should throw an error when not given the name or the price",()=>{
        delete newProduct.name
        expect(()=>{
            addProduct(newProduct)
        }).to.throw(TypeError,"undefined is not a string")
        newProduct.name=name
        delete newProduct.price
        expect(()=>{
            addProduct(newProduct)
        }).to.throw(TypeError,"undefined is not a number")
    })
    it("should throw an error when the values of the product object are not of the required type",()=>{
        newProduct.name=789
        expect(()=>{addProduct(newProduct)}).to.throw(TypeError,"789 is not a string")
        newProduct.name= name
        newProduct.description=789
        expect(()=>{addProduct(newProduct)}).to.throw(TypeError,"789 is not a string")
        newProduct.description= description
        newProduct.price="789"
        expect(()=>{addProduct(newProduct)}).to.throw(TypeError,"789 is not a number")
        newProduct.price= price
        newProduct.tax="789"
        expect(()=>{addProduct(newProduct)}).to.throw(TypeError,"789 is not a number")
        newProduct.tax= tax
        newProduct.alergens.push(789)
        expect(()=>{addProduct(newProduct)}).to.throw(TypeError,"789 is not a string")
        newProduct.alergens= alergens
    })
    afterEach(() => Product.deleteMany())

    after(mongoose.disconnect)
})

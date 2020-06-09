require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveAllProducts = require('./retrieve-all-products')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { Product } } = require('facturator-data')
const {  errors: { UnexistenceError } } = require('facturator-commons')

describe('retrieveAllProducts', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, description, price,tax, alergens, productId1,productId2

    beforeEach(() =>
        Product.deleteMany()
            .then(async() => {
                name = `name-${random()}`
                description= `description-${random()}`
                price= random()
                tax= random()
                alergens=[]
                for(let i = 0; i < Math.floor(random()*4);i++){
                    alergens.push(`alergen-${random()}`)
                }
                const product1= await Product.create({name,description,price,tax,alergens})
                productId1=product1._id.toString()
                const product2= await Product.create({name: name+2,description:description+2,price,tax,alergens})
                productId2= product2._id.toString()
            })
    )
    it("should return all products",async()=>{
        const products= await retrieveAllProducts()
        expect(products).to.exist
        expect(products.length).to.equal(2)
        const [product1,product2]= products
        expect(product1.name).to.equal(name)
        expect(product1.description).to.equal(description)
        expect(product1.tax).to.equal(tax)
        expect(product1.alergens).to.deep.equal(alergens)
        expect(product1.id).to.equal(productId1)
        expect(product1._id).to.be.undefined
        expect(product2.name).to.equal(name+2)
        expect(product2.description).to.equal(description+2)
        expect(product2.tax).to.equal(tax)
        expect(product2.alergens).to.deep.equal(alergens)
        expect(product2.id).to.equal(productId2)
        expect(product2._id).to.be.undefined
    })
    it("should return an empty array if there are no products",async()=>{
        await Product.deleteMany()
        const products= await retrieveAllProducts()
        expect(products).to.be.instanceOf(Array)
        expect(products.length).to.equal(0)
    })
    afterEach(() => Product.deleteMany())

    after(mongoose.disconnect)
})
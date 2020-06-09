require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveProduct = require('./retrieve-product')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { Product } } = require('facturator-data')
const {  errors: { UnexistenceError } } = require('facturator-commons')

describe('retrieveProduct', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, description, price,tax, alergens, productId

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
                const product= await Product.create({name,description,price,tax,alergens})
                productId=product._id.toString()
            })
    )
    it("should return a product when given a valid id",async()=>{
        const product= await retrieveProduct(productId)
        expect(product.name).to.equal(name)
        expect(product.description).to.equal(description)
        expect(product.price).to.equal(price)
        expect(product.tax).to.equal(tax)
        expect(product.alergens).to.deep.equal(alergens)
        expect(product.id).to.equal(productId)
        expect(product._id).to.be.undefined
    })
    it("should return an error if there is no  product with that id",async()=>{
        const id=mongoose.ObjectId().toString()
        let error
        try{
            await retrieveProduct(id)
        }catch(_error){
            error=_error
        }
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`product with id ${id} does not exist`)
    })
    it("should throw an error if the id is not given or is not a string",()=>{
        expect(()=>{retrieveProduct()}).to.throw(TypeError,"undefined is not a string")
        expect(()=>{retrieveProduct(123)}).to.throw(TypeError,"123 is not a string")
    })
    afterEach(() => Product.deleteMany())

    after(mongoose.disconnect)
})
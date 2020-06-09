require("dotenv").config()
const{ env:{TEST_MONGODB_URL: MONGODB_ULR}}= process
const addClientDiscount= require("./add-client-discount")
const{random}= Math
const{expect}= require("chai")
const { errors:{UnexistenceError}} = require('facturator-commons')
const {mongoose,models:{Client,Product}}= require("facturator-data")

describe("addClientDiscount",()=>{
    before(()=>{mongoose.connect(MONGODB_ULR)})
    let clientName, clientEstablishment, clientContactNumber, clientEmail ,clientDirection,clientPaymentMethod,clientPaymentInfo,clientId
    let productName, productDescription, productPrice, productTax, productAlergens,productId,productDiscount
    let newDiscount={}
    beforeEach(async()=>{
        await Client.deleteMany()
        clientName = `name-${random()}`
        clientEstablishment = `establishment-${random()}`
        clientContactNumber= random()
        clientEmail = `e-${random()}@mail.com`
        clientDirection=`direction-${random()}`
        clientPaymentMethod=`paymentMethod-${random()}`
        clientPaymentInfo=`paymentInfo-${random()}`
        const client= await Client.create({name:clientName,establishment:clientEstablishment,contactNumber:clientContactNumber,email:clientEmail,direction:clientDirection,paymentInfo:clientPaymentInfo,paymentMethod:clientPaymentMethod})
        clientId= client._id.toString()
        await Product.deleteMany()
        productName = `name-${random()}`
        productDescription= `description-${random()}`
        productPrice= random()
        productTax= random()
        productAlergens=[]
        for(let i = 0; i < Math.floor(random()*4);i++){
            productAlergens.push(`alergen-${random()}`)
        }
        const product= await Product.create({name:productName,description:productDescription,price:productPrice,tax:productTax,alergens:productAlergens})
        productId=product._id.toString()
        productDiscount=Math.floor(random()*100)
        newDiscount.product= productId
        newDiscount.discount= productDiscount
    })
    it("should make a new discount for an exiting product for an existing client",async()=>{
        const result= await addClientDiscount(clientId,newDiscount)
        expect(result).to.be.undefined
        const client= await Client.findOne({_id:mongoose.ObjectId(clientId)})
        expect(client).to.exist
        expect(client.name).to.equal(clientName)
        expect(client.discounts).to.exist
        expect(client.discounts.length).to.equal(1)
        expect(client.discounts[0].discount).to.equal(newDiscount.discount)
        expect(client.discounts[0].product.toString()).to.equal(newDiscount.product)
    })
    it("should return an error when the client does not exist",async()=>{
        const id=mongoose.ObjectId().toString()
        let error
        try {
           await addClientDiscount(id,newDiscount)
        } catch (_error) {
            error=_error
        }
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`client with id ${id} does not exist`)
    })
    it("should return an error when the product does not exist",async()=>{
        const id=mongoose.ObjectId().toString()
        newDiscount.product=id
        let error
        try {
           await addClientDiscount(clientId,newDiscount)
        } catch (_error) {
            error=_error
        }
        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`product with id ${id} does not exist`)
    })
    it("should throw an error when not given a clientId or a discount",()=>{
        expect(()=>{addClientDiscount(clientId)}).to.throw(TypeError,"undefined is not an object")
        expect(()=>{addClientDiscount(undefined,newDiscount)}).to.throw(TypeError,"undefined is not a string")
    })
    it("should throw an error when the clientId or the discount don't match the type",()=>{
        expect(()=>{addClientDiscount(123,newDiscount)}).to.throw(TypeError,"123 is not a string")
        newDiscount.product=123
        expect(()=>{addClientDiscount(clientId,newDiscount)}).to.throw(TypeError,"123 is not a string")
        newDiscount.product=productId
        newDiscount.discount="discount"
        expect(()=>{addClientDiscount(clientId,newDiscount)}).to.throw(TypeError,"discount is not a number")
    })
    afterEach(async() =>{
        await Product.deleteMany()
        await Client.deleteMany()
    })

    after(mongoose.disconnect)
})
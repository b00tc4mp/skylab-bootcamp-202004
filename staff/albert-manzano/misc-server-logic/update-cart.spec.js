require('dotenv').config();

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process;

const updateCart = require('./update-cart');
const { random } = Math;
const { expect } = require('chai');
require('misc-commons/polyfills/json');
require('misc-commons/polyfills/number')
const { mongo } = require('misc-data');
const { ObjectId } = mongo;

describe.only('logic - update-cart user', () => {
    let users, products, name, surname, email, password, productName, productDescription, productPrice, url;

    before(() =>
        mongo.connect(MONGODB_URL).then((connection) => {
            users = connection.db().collection('users')
            products = connection.db().collection('products')
        })
    );

    let userId, productId

    beforeEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany()
        ])
            .then(() => {
                name = `name-${random()}`;
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                productName = `name-${random()}`
                productDescription = `description${random()}`
                productPrice = random() * 20
                url = `http://${random()}`

                return Promise.all([
                    
                    users.insertOne({ name, surname, email, password }).then(({ insertedId }) => userId = insertedId.toString()),
                    products.insertOne({ productName, productDescription, productPrice, url }).then(({ insertedId }) => productId = insertedId.toString())
                ])
            })
    );


    it('should add product on cart when user exists', () => {debugger
        return updateCart(userId, productId, 1)
            .then(result => {
                expect(result).to.be.undefined
                
                return users.findOne({ _id: ObjectId(userId) })
            })
            .then(user => { debugger
                expect(user).to.exist

                const { cart } = user

                expect(cart).to.exist
                expect(cart.length).to.equal(1)

                const [_product] = cart
                expect(_product).to.exist

                const { product, quantity } = _product

               
                expect(quantity).to.equal(1)
                return expect(product.toString()).to.equal(productId)
            })
    })

    afterEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany()
        ])
    )

    after(() => mongo.disconnect())
});

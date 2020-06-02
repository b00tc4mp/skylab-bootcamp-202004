require("dotenv").config();

const {
  env: { TEST_MONGODB_URL: MONGODB_URL },
} = process;

const placeOrder = require("./place-order");
// const { random } = Math;
const { expect } = require("chai");
require('../utils/polyfills/math')
const { random } = Math
const { mongo } = require("../data");
const { ObjectId } = mongo;


describe("logic - place order", () => {
  debugger;
  before(() =>
    mongo.connect(MONGODB_URL).then((connection) => {
      users = connection.db().collection("users");
      products = connection.db().collection("products");
    })
  );

  let userId, productId, quantity;

  beforeEach(() =>
    Promise.all([users.deleteMany(), products.deleteMany()]).then(() => {
      const user = {
        name: `name-${random()}`,
        surname: `surname-${random()}`,
        email: `e-${random()}@mail.com`,
        password: `password-${random()}`,
      };
      const product = {
        name: `name-${random()}`,
        color: `color-${random()}`,
        price: random(),
        url: `url-${random()}`,
      };

      return Promise.all([
        users
          .insertOne(user)
          .then(({ insertedId }) => (userId = insertedId.toString())),
        products
          .insertOne(product)
          .then(({ insertedId }) => (productId = insertedId.toString())),
      ]).then(() => {
        const { cart = [] } = user;
        quantity = random()*10
        cart.push(product._id.toString(), quantity)
        
        return users.updateOne({ _id: ObjectId(userId) }, { $set: { cart } });
      });
    })
  );
  
  it("should succed on place order", () => {
    placeOrder(userId)
    .then(({result}) => {
        debugger
      expect(result).to.exist;
    //   expect(result).to.be.an(Object);
      expect(result.nModified).to.equal(1);

      users.findOne({ _id : ObjectId(userId) }).then((user) => {
        expect(user.orders).to.exist;
        expect(user.orders.length).to.be.greaterThan(0);
        expect(user.cart).not.to.exist
      });
    })
    
  });

  
  describe('unhappy path', () => {
    it('should fail on non existing cart', () => {
    users.updateOne({ _id: ObjectId(userId) }, { $unset: { cart } })
      .then(() => placeOrder(userId))
      .then(() => { throw new Error('should not reach this point') })
      .catch(error => 
        expect(error).to.be.instanceof(Error),
        expect(error.message).to.equal('no tienes carro pantera!!')
      )
    });
  })
})
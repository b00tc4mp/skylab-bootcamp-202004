const register = require("./register");
const { random } = Math;
const fs = require("fs");
const path = require("path");
require("../utils/json");
const { expect } = require("chai");
const { deleteFilesByExtensionFromDirectory } = require("../utils/files");
const uid = require("../utils/uid");

describe("register", () => {
  let name, surname, email, password, id, file;
  const data = path.join(__dirname, "..", "data");

  beforeEach((done) => {
    name = `name-${random()}`;
    surname = `surname-${random()}`;
    email = `e-${random()}@mail.com`;
    password = `password-${random()}`;
   
    deleteFilesByExtensionFromDirectory(
      path.join(data, "users"),
      ".json",
      (error) => {
        if (error) return done(error);
        done();
      }
    );
  });

  it("should register a user when u pass the correct inpunts", (done) => {
   
    register(name, surname, email, password, (error, id) => {
      expect(error).to.be.null;
      expect(name).to.be.a("string");
      expect(surname).to.be.a("string");
      expect(email).to.be.a("string");
      expect(password).to.be.a("string");
      expect(id).to.be.a("string");

      fs.readFile(
        path.join(__dirname, "..", "data", "users", `${id}.json`),
        (error, json) => {
          const file = JSON.parse(json);
          expect(error).to.be.null;
          expect(file.name).to.be.equal(name);
          expect(file.surname).to.be.equal(surname);
          expect(file.email).to.be.equal(email);
          expect(file.password).to.be.equal(password);
          expect(file.id).to.be.equal(id);
          done();
        }
      );
    });
  });

  it("should it fail when user already exist", (done) => {
   
    id = uid();
    const user = { name, surname, email, password };
    fs.writeFile(
      path.join(__dirname, "..", "data", "users", `${id}.json`),
      JSON.prettify(user),
      (error) => {
       
        register(name, surname, email, password, (error, id) => {
         
          expect(name).to.be.a("string");
          expect(surname).to.be.a("string");
          expect(email).to.be.a("string");
          expect(password).to.be.a("string");
          expect(error).to.exist;
          expect(error.message).to.be.equal(
            `user with e-mail ${email}, already exist`
          );
          done();
        });
      }
    );
  });
  afterEach((done) => {
    deleteFilesByExtensionFromDirectory(
      path.join(data, "users"),
      ".json",
      (error) => {
        if (error) return done(error);
        done();
      }
    );
  });

it("When the credentials do not meet the format criteria", function () {
  expect(function () {
    register(name,surname,"adsadasdas.com", password);
  }).to.throw(Error, "adsadasdas.com is not an e-mail");

  expect(function () {
    register(name,surname, 1, password, () => {});
  }).to.throw(TypeError, "1 is not a string");
  expect(function () {
    register(name,surname,undefined, password, () => {});
  }).to.throw(TypeError, "undefined is not a string");
  expect(function () {
    register(name,surname,true, password, () => {});
  }).to.throw(TypeError, "true is not a string");
  expect(function () {
    register(name,surname,null, password, () => {});
  }).to.throw(TypeError, "null is not a string");
  expect(function () {
    register(name,surname,[], password, () => {});
  }).to.throw(TypeError, " is not a string");
  expect(function () {
    register(name,surname,function () {},password,() => {});
  }).to.throw(TypeError, "function () {} is not a string");
  expect(function () {
    register(name,surname,{}, password, () => {});
  }).to.throw(TypeError, "[object Object] is not a string");
  expect(function () {
    register(name,surname,NaN, password, () => {});
  }).to.throw(TypeError, "NaN is not a string");

 /*  expect(function () {
    register(name,surname,email, "   ", () => {});
  }).to.throw(Error, `   length is not greater or equal than 8`); 
 */
  expect(function () {
    register(name,surname,email, "", () => {});
  }).to.throw(Error, " length is not greater or equal than 8");

  expect(function () {
    register(name,surname,email, undefined, () => {});
  }).to.throw(TypeError, "undefined is not a string");
  expect(function () {
    register(name,surname,email, 1, () => {});
  }).to.throw(TypeError, "1 is not a string");
  expect(function () {
    register(name,surname,email, true, () => {});
  }).to.throw(TypeError, "true is not a string");
  expect(function () {
    register(name,surname,email, null, () => {});
  }).to.throw(TypeError, "null is not a string");
  expect(function () {
    register(name,surname,email, [], () => {});
  }).to.throw(TypeError, " is not a string");
  expect(function () {
    register(name,surname,email,function () {},() => {});
  }).to.throw(TypeError, "function () {} is not a string");
  expect(function () {
    register(name,surname,email, {}, () => {});
  }).to.throw(TypeError, "[object Object] is not a string");
  expect(function () {
    register(name,surname,email, NaN, () => {});
  }).to.throw(TypeError, "NaN is not a string");

  expect(function () {
    register(name,surname,email, password, undefined);
  }).to.throw(TypeError, "undefined is not a function");
  expect(function () {
    register(name,surname,email, password, 1);
  }).to.throw(TypeError, "1 is not a function");
  expect(function () {
    register(name,surname,email, password, true);
  }).to.throw(TypeError, "true is not a function");
  expect(function () {
    register(name,surname,email, password, null);
  }).to.throw(TypeError, "null is not a function");
  expect(function () {
    register(name,surname,email, password, []);
  }).to.throw(TypeError, " is not a function");
  expect(function () {
    register(name,surname,email, password, {});
  }).to.throw(TypeError, "[object Object] is not a function");
  expect(function () {
    register(name,surname,email, password, NaN);
  }).to.throw(TypeError, "NaN is not a function");
  expect(function () {
    register(undefined,surname,email, password, () => {});
  }).to.throw(TypeError, "undefined is not a string");
  expect(function () {
    register(1,surname,email, password, () => {});
  }).to.throw(TypeError, "1 is not a string");
  expect(function () {
    register(true,surname,email, password, () => {});
  }).to.throw(TypeError, "true is not a string");
  expect(function () {
    register(null,surname,email, password, () => {});
  }).to.throw(TypeError, "null is not a string");
  expect(function () {
    register([],surname,email, password, () => {});
  }).to.throw(TypeError, " is not a string");
  expect(function () {
    register(function () {},surname,email,password,() => {});
  }).to.throw(TypeError, "function () {} is not a string");
  expect(function () {
    register({},surname,email, password, () => {});
  }).to.throw(TypeError, "[object Object] is not a string");
  expect(function () {
    register(NaN,surname,email, password, () => {});
  }).to.throw(TypeError, "NaN is not a string");
  expect(function () {
    register(name,undefined,email, password, () => {});
  }).to.throw(TypeError, "undefined is not a string");
  expect(function () {
    register(name,1,email, password, () => {});
  }).to.throw(TypeError, "1 is not a string");
  expect(function () {
    register(name,true,email,password , () => {});
  }).to.throw(TypeError, "true is not a string");
  expect(function () {
    register(name,null,email, password, () => {});
  }).to.throw(TypeError, "null is not a string");
  expect(function () {
    register(name,[],email, password, () => {});
  }).to.throw(TypeError, " is not a string");
  expect(function () {
    register(name,function () {},email,password,() => {});
  }).to.throw(TypeError, "function () {} is not a string");
  expect(function () {
    register(name,{},email, password, () => {});
  }).to.throw(TypeError, "[object Object] is not a string");
  expect(function () {
    register(name,NaN,email, password, () => {});
  }).to.throw(TypeError, "NaN is not a string");

  

  })
})




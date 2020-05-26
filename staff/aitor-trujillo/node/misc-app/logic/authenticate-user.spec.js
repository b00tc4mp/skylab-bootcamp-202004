const login = require("./authenticate-user");
const { random } = Math;
const fs = require("fs");
const path = require("path");
const uid = require("../utils/uid");
const { expect } = require("chai");
const { deleteFilesByExtensionFromDirectory } = require("../utils/files");

describe("login", () => {
  const data = path.join(__dirname, "..", "data");

  let name, surname, email, password, id;

  beforeEach((done) => {
    deleteFilesByExtensionFromDirectory(
      path.join(data, "users"),
      ".json",
      (error) => {
        if (error) return done(error);
      }
    );

    name = `name-${random()}`;
    surname = `surname-${random()}`;
    email = `e-${random()}@mail.com`;
    password = `password-${random()}`;
    id = uid();

    fs.writeFile(
      path.join(__dirname, "..", "data", "users", `${id}.json`),
      JSON.stringify({ name, surname, email, password, id }, null, 4),
      (error) => {
        if (error) return done(error);

        done();
      }
    );
  });
  it("should succeed on valid data", (done) => {
    debugger;
    login(email, password, (error, _id) => {
      expect(error).to.be.null;
      expect(password).to.be.a("string");
      expect(email).to.be.a("string");
      expect(_id).to.be.a("string");
      expect(_id).to.be.equal(id);
      done();
    });
  });
  it("should fail on wrong credentials", (done) => {
    password = "1212";
    login(email, password, (error, _id) => {
      expect(error).to.exist;
      expect(password).to.be.a("string");
      expect(email).to.be.a("string");
      expect(error.message).to.be.equal("wrong password");
      expect(_id).to.be.undefined;
      done();
    });
  });
  it("should throw an error if the user dosent exist", (done) => {
    email = "adasad@speechgrammarli.com";
    login(email, password, (error, _id) => {
      expect(error).to.exist;
      expect(password).to.be.a("string");
      expect(email).to.be.a("string");
      expect(error.message).to.be.equal(`user with e-mail adasad@speechgrammarli.com does not exist`);
      expect(_id).to.be.undefined;
      done();
    });
  });
  afterEach((done)=>{
    deleteFilesByExtensionFromDirectory(
      path.join(data, "users"),
      ".json",
      (error) => {
        if (error) return done(error);
        done()
      })
  })

  it("When the credentials do not meet the format criteria", function () {
    expect(function () {
      login("adsadasdas.com", password);
    }).to.throw(Error, "adsadasdas.com is not an e-mail");

    expect(function () {
      login(1, password, () => {});
    }).to.throw(TypeError, "1 is not a string");
    expect(function () {
      login(undefined, password, () => {});
    }).to.throw(TypeError, "undefined is not a string");
    expect(function () {
      login(true, password, () => {});
    }).to.throw(TypeError, "true is not a string");
    expect(function () {
      login(null, password, () => {});
    }).to.throw(TypeError, "null is not a string");
    expect(function () {
      login([], password, () => {});
    }).to.throw(TypeError, " is not a string");
    expect(function () {
      login(
        function () {},
        password,
        () => {}
      );
    }).to.throw(TypeError, "function () {} is not a string");
    expect(function () {
      login({}, password, () => {});
    }).to.throw(TypeError, "[object Object] is not a string");
    expect(function () {
      login(NaN, password, () => {});
    }).to.throw(TypeError, "NaN is not a string");

    expect(function () {
      login(email, "   ", () => {});
    }).to.throw(Error, "    is empty or blank");

    expect(function () {
      login(email, "", () => {});
    }).to.throw(Error, " is empty or blank");

    expect(function () {
      login(email, undefined, () => {});
    }).to.throw(TypeError, "undefined is not a string");
    expect(function () {
      login(email, 1, () => {});
    }).to.throw(TypeError, "1 is not a string");
    expect(function () {
      login(email, true, () => {});
    }).to.throw(TypeError, "true is not a string");
    expect(function () {
      login(email, null, () => {});
    }).to.throw(TypeError, "null is not a string");
    expect(function () {
      login(email, [], () => {});
    }).to.throw(TypeError, " is not a string");
    expect(function () {
      login(
        email,
        function () {},
        () => {}
      );
    }).to.throw(TypeError, "function () {} is not a string");
    expect(function () {
      login(email, {}, () => {});
    }).to.throw(TypeError, "[object Object] is not a string");
    expect(function () {
      login(email, NaN, () => {});
    }).to.throw(TypeError, "NaN is not a string");

    expect(function () {
      login(email, password, undefined);
    }).to.throw(TypeError, "undefined is not a function");
    expect(function () {
      login(email, password, 1);
    }).to.throw(TypeError, "1 is not a function");
    expect(function () {
      login(email, password, true);
    }).to.throw(TypeError, "true is not a function");
    expect(function () {
      login(email, password, null);
    }).to.throw(TypeError, "null is not a function");
    expect(function () {
      login(email, password, []);
    }).to.throw(TypeError, " is not a function");
    expect(function () {
      login(email, password, {});
    }).to.throw(TypeError, "[object Object] is not a function");
    expect(function () {
      login(email, password, NaN);
    }).to.throw(TypeError, "NaN is not a function");
  });
});

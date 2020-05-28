const retrieveUser = require("./retrieve-user");
const { random } = Math;
const fs = require("fs");
const path = require("path");
require("../utils/json");
require("../utils/uid");
const { expect } = require("chai");
const { deleteFilesByExtensionFromDirectory } = require("../utils/files");
const uid = require("../utils/uid");

describe("retrieveUser", () => {
  let name, surname, email, password, id;

  beforeEach((done) => {
    name = `name-${random()}`;
    surname = `surname-${random()}`;
    email = `e-${random()}@mail.com`;
    password = `password-${random()}`;
    id = uid();

    deleteFilesByExtensionFromDirectory(
      path.join(__dirname, "..", "data", "users"),
      ".json",
      (error) => {
        if (error) return done(error);
      }
    );

    fs.writeFile(
      path.join(__dirname, "..", "data", "users", `${id}.json`),
      JSON.stringify({ name, surname, email, password, id }, null, 4),
      (error) => {
        if (error) return done(error);

        done();
      }
    );
  });

  it("should return user when it exist", (done) => {
    retrieveUser(id, (error, user) => {
      expect(error).to.be.null;
      expect(user).to.exist;
      expect(user).to.be.an("object");
      expect(id).to.be.a("string");
      expect(user.name).to.exist;
      expect(user.surname).to.exist;
      expect(user.email).to.exist;
      expect(user.name).to.be.equal(name);
      expect(user.surname).to.be.equal(surname);
      expect(user.email).to.be.equal(email);
      expect(user.password).to.be.undefined;
      expect(user.id).to.be.undefined;
      done();
    });
  });
  it("should throw an error, when user dosent exist", (done) => {
    id = uid();
    retrieveUser(id, (error, user) => {
      expect(error).to.exist;
      expect(user).to.be.undefined;
      expect(error.message).to.be.equal("user dosent exist");
      done();
    });
  });
  afterEach((done) => {
    deleteFilesByExtensionFromDirectory(
      path.join(__dirname, "..", "data", "users"),
      ".json",
      (error) => {
        if (error) return done(error);
        done();
      }
    );
  });

  it("When the credentials do not meet the format criteria", function () {
    expect(function () {
      retrieveUser(1, () => {});
    }).to.throw(TypeError, "1 is not a string");
    expect(function () {
      retrieveUser(undefined, () => {});
    }).to.throw(TypeError, "undefined is not a string");
    expect(function () {
      retrieveUser(true, () => {});
    }).to.throw(TypeError, "true is not a string");
    expect(function () {
      retrieveUser(null, () => {});
    }).to.throw(TypeError, "null is not a string");
    expect(function () {
      retrieveUser([], () => {});
    }).to.throw(TypeError, " is not a string");
    expect(function () {
      retrieveUser(
        function () {},
        () => {}
      );
    }).to.throw(TypeError, "function () {} is not a string");
    expect(function () {
      retrieveUser({}, () => {});
    }).to.throw(TypeError, "[object Object] is not a string");
    expect(function () {
      retrieveUser(NaN, () => {});
    }).to.throw(TypeError, "NaN is not a string");
    expect(function () {
      retrieveUser(id, undefined);
    }).to.throw(TypeError, "undefined is not a function");
    expect(function () {
      retrieveUser(id, 1);
    }).to.throw(TypeError, "1 is not a function");
    expect(function () {
      retrieveUser(id, true);
    }).to.throw(TypeError, "true is not a function");
    expect(function () {
      retrieveUser(id, null);
    }).to.throw(TypeError, "null is not a function");
    expect(function () {
      retrieveUser(id, []);
    }).to.throw(TypeError, " is not a function");
    expect(function () {
      retrieveUser(id, {});
    }).to.throw(TypeError, "[object Object] is not a function");
    expect(function () {
      retrieveUser(id, NaN);
    }).to.throw(TypeError, "NaN is not a function");
  });
});

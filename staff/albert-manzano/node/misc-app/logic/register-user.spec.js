const registerUser = require("./register-user");
const { random } = Math;
const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const { deleteFilesByExtensionFromDirectory } = require("../utils/files");

describe("register", () => {
  let name, surname, email, password, file;
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
    registerUser(name, surname, email, password, (error, id) => {
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

  it("When the credentials do not meet the format criteria", function () {
    expect(function () {
      registerUser(1, surname, email, password, () => { });
    }).to.throw(TypeError, "1 is not a string");
    expect(function () {
      registerUser(undefined, surname, email, password, () => { });
    }).to.throw(TypeError, "undefined is not a string");
    expect(function () {
      registerUser(true, surname, email, password, () => { });
    }).to.throw(TypeError, "true is not a string");
    expect(function () {
      registerUser(null, surname, email, password, () => { });
    }).to.throw(TypeError, "null is not a string");
    expect(function () {
      registerUser(name, true, email, password, () => { });
    }).to.throw(TypeError, "true is not a string");
    expect(function () {
      registerUser(name, 1, email, password, () => { });
    }).to.throw(TypeError, "1 is not a string");
    expect(function () {
      registerUser(name, surname, undefined, password, () => { });
    }).to.throw(TypeError, "undefined is not a string");
    expect(function () {
      registerUser(name, surname, true, password, () => { });
    }).to.throw(TypeError, "true is not a string");
    expect(function () {
      registerUser(name, surname, null, password, () => { });
    }).to.throw(TypeError, "null is not a string");
    expect(function () {
      registerUser(name, surname, [], password, () => { });
    }).to.throw(TypeError, " is not a string");
    expect(function () {
      registerUser(
        name, surname, function () { },
        password,
        () => { }
      );
    }).to.throw(TypeError, "function () { } is not a string");
    expect(function () {
      registerUser(name, surname, {}, password, () => { });
    }).to.throw(TypeError, "[object Object] is not a string");
    expect(function () {
      registerUser(name, surname, NaN, password, () => { });
    }).to.throw(TypeError, "NaN is not a string");
    expect(function () {
      registerUser(name, surname, email, password, undefined);
    }).to.throw(TypeError, "undefined is not a function");
    expect(function () {
      registerUser(name, surname, email, password, 1);
    }).to.throw(TypeError, "1 is not a function");
    expect(function () {
      registerUser(name, surname, email, password, true);
    }).to.throw(TypeError, "true is not a function");
    expect(function () {
      registerUser(name, surname, email, password, null);
    }).to.throw(TypeError, "null is not a function");
    expect(function () {
      registerUser(name, surname, email, password, []);
    }).to.throw(TypeError, " is not a function");
    expect(function () {
      registerUser(name, surname, email, password, {});
    }).to.throw(TypeError, "[object Object] is not a function");
    expect(function () {
      registerUser(name, surname, email, password, NaN);
    }).to.throw(TypeError, "NaN is not a function");
  });
});



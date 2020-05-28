const listContacts = require("./list-contacs");
const { random } = Math;
const fs = require("fs");
const path = require("path");
const uid = require("../utils/uid");
const { expect } = require("chai");
require("../utils/json");
const { deleteFilesByExtensionFromDirectory } = require("../utils/files");

describe.only("list-contacts", () => {
  let contact = {};

  let user = {};

  const data = path.join(__dirname, "..", "data");

  let name, surname, email, password, id;

  let _name, _surname, _email, phone, birth, country, contactId;

  beforeEach((done) => {
    deleteFilesByExtensionFromDirectory(
      path.join(data, "users"),
      ".json",
      (error) => {
        if (error) return done(error);

        deleteFilesByExtensionFromDirectory(
          path.join(data, "contacts"),
          ".json",
          (error) => {
            if (error) return done(error);

            name = `name-${random()}`;
            surname = `surname-${random()}`;
            email = `e-${random()}@mail.com`;
            password = `password-${random()}`;
            id = uid();

            _name = `name-${random()}`;
            _surname = `surname-${random()}`;
            _email = `e-${random()}@mail.com`;
            phone = `phone-${random()}`;
            birth = `birth-${random()}`;
            country = `country-${random()}`;
            contactId = uid();

            user = { name, surname, email, password, id };
            contact = {
              _name,
              _surname,
              _email,
              phone,
              birth,
              country,
              contactId,
              userId : id,
            };

            fs.writeFile(
              path.join(data, "users", `${id}.json`),
              JSON.prettify(user),
              (error) => {
                debugger;
                if (error) return done(error);

                fs.writeFile(
                  path.join(data, "contacts", `${contactId}.json`),
                  JSON.prettify(contact),
                  (error) => {
                    if (error) return done(error);
                    done();
                  });
              });
          });
      });
  });

  it('should return an array with all users contacts', () => {debugger
    listContacts(id, (error,results) => {
        debugger
        expect(error).to.be.null
        expect(results).to.exist
        expect(results).to.be.an('array')
        expect(results.length).greaterThan(0)
    })
  });
  it('it should return an empty array if the user dont have contacts', () => {
    deleteFilesByExtensionFromDirectory(path.join(data, "contacts"),".json",
        (error) => {
          if (error) return done(error);
    listContacts(id, (error,results) => {
        expect(error).to.be.null
        expect(results).to.exist
        expect(results).to.be.an('array')
        expect(results.length).to.be.equal(0) 
    })
  })

})
it("When the credentials do not meet the format criteria", function () {
expect(function () {
  listContacts(undefined, () => {});
}).to.throw(TypeError, "undefined is not a string");
expect(function () {
  listContacts(1, () => {});
}).to.throw(TypeError, "1 is not a string");
expect(function () {
  listContacts(true, () => {});
}).to.throw(TypeError, "true is not a string");
expect(function () {
  listContacts(null, () => {});
}).to.throw(TypeError, "null is not a string");
expect(function () {
  listContacts([], () => {});
}).to.throw(TypeError, " is not a string");
expect(function () {
  listContacts(function () {},() => {});
}).to.throw(TypeError, "function () {} is not a string");
expect(function () {
  listContacts({}, () => {});
}).to.throw(TypeError, "[object Object] is not a string");
expect(function () {
  listContacts(NaN, () => {});
}).to.throw(TypeError, "NaN is not a string");

expect(function () {
  listContacts(id, undefined);
}).to.throw(TypeError, "undefined is not a function");
expect(function () {
  listContacts(id, 1);
}).to.throw(TypeError, "1 is not a function");
expect(function () {
  listContacts(id, true);
}).to.throw(TypeError, "true is not a function");
expect(function () {
  listContacts(id, null);
}).to.throw(TypeError, "null is not a function");
expect(function () {
  listContacts(id, []);
}).to.throw(TypeError, " is not a function");
expect(function () {
  listContacts(id, {});
}).to.throw(TypeError, "[object Object] is not a function");
expect(function () {
  listContacts(id, NaN);
}).to.throw(TypeError, "NaN is not a function");
});
})
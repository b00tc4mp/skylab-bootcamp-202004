const registerUser = require("./register-user");
const { random } = Math;
const fs = require("fs");
const path = require("path");
const uid = require("../utils/uid");
const { expect } = require("chai");

describe.only("registerUser", () => {
  let name, surname, email, password, id;

  beforeEach(() => {
    name = `name-${random()}`;
    surname = `surname-${random()}`;
    email = `e-${random()}@mail.com`;
    password = Math.floor(Math.random() * 100000000).toString();
    id = uid();
  });

    it("should succeed on valid data", (done) => { debugger
        registerUser({ name, surname, email, password }, (error, id) => {
        // WARN do not use uid directly... create a user first in bfore each
        expect(error).to.be.null;

        // expect(id).to.be.a("string");

            fs.readFile(path.join(__dirname, "..", "data", "users", `${id}.json`), "utf8",(error, content) => {
            expect(error).to.be.null;

            expect(content).to.exist;

            const contact = JSON.parse(content);

            expect(contact.name).to.equal(name);
            expect(contact.surname).to.equal(surname);
            expect(contact.email).to.equal(email);
            console.log(name);
            done();
            });
        });
    });

    afterEach((done) => {
        fs.unlink(path.join(__dirname, "..", "data", "users", `${id}.json`), (error) => {
        if (error) {
        console.log(error);
        return;
            }
        });
    done();
    });

  // TODO clean data (on after)
});

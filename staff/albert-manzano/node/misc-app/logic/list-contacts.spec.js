const listContacts = require("./list-contacts");
const { random } = Math;
const fs = require("fs");
const path = require("path");
const uid = require("../utils/uid");
const { expect } = require("chai");
const { deleteFilesByExtensionFromDirectory } = require("../utils/files");


describe("list-contacts", () => {
    const data = path.join(__dirname, "..", "data");

    let name, surname, email, password, id;
    let name2, surname2, email2, id2;
    let userId

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
        userId = uid();

        name2 = `name-${random()}`;
        surname2 = `surname-${random()}`;
        email2 = `e-${random()}@mail.com`;

        fs.writeFile(
            path.join(__dirname, "..", "data", "users", `${id}.json`),
            JSON.stringify({ name, surname, email, password, id:userId }, null, 4),
            (error) => {
                if (error) return done(error);

                fs.writeFile(
                    path.join(__dirname, "..", "data", "contacts", `${id}.json`),
                    JSON.stringify({ name:name2, surname:surname2, email:email2, userId }, null, 4),
                    (error) => {
                        if (error) return done(error);
        
                        done();
                    }
                );
            }
        );
        
    });

    it('should succeed on valid data', done => {
        listContacts(userId,(error, contacts) => {
            expect(error).to.be.null
            expect(contacts).to.be.instanceof(Array)
            expect(contacts.length).to.equal(1)
            debugger
            expect(contacts[0]).to.exist
            expect(contacts[0].name).to.equal(name2)
            expect(contacts[0].surname).to.equal(surname2)
            expect(contacts[0].email).to.equal(email2)
            done()
        })
    })
    
    afterEach((done) => {
        deleteFilesByExtensionFromDirectory(
            path.join(data, "users"),
            ".json",
            (error) => {
                if (error) return done(error);
                done()
            })
    })
});


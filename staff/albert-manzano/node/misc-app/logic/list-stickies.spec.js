const listStickies = require("./list-stickies");
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
    let message

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
        message = 'hola amigo'

        fs.writeFile(
            path.join(__dirname, "..", "data", "users", `${id}.json`),
            JSON.stringify({ name, surname, email, password, id: userId }, null, 4),
            (error) => {
                if (error) return done(error);

                fs.writeFile(
                    path.join(__dirname, "..", "data", "stickies", `${id}.json`),
                    JSON.stringify({ message, userId }, null, 4),
                    (error) => {
                        if (error) return done(error);

                        done();
                    }
                );
            }
        );
    });

    it('should succeed on valid data', done => {
        listStickies(userId, (error, stickies) => {
            expect(error).to.be.null
            expect(stickies).to.be.instanceof(Array)
            expect(stickies.length).to.equal(1)
            debugger
            expect(stickies[0]).to.exist
            expect(stickies[0].message).to.equal(message)
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


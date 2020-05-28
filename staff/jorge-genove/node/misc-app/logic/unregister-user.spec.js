const unregister = require("./unregister-user");
const { random } = Math;
const fs = require("fs");
const path = require("path");
const uid = require("../utils/uid");
const { expect } = require("chai");
const { deleteFilesByExtensionFromDirectory } = require("../utils/files");
require("../utils/json");
debugger
describe("unregister-user", () => {
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
          fs.writeFile(
            path.join(__dirname, "..", "data", "users", `${id}.json`),
            JSON.stringify({ name, surname, email, password, id }, null, 4),
            (error) => {
              if (error) return done(error);
      
              done();
            });
        });
      });
  
     

  it("should remove a user when the email and password are ok", (done) => {debugger
    unregister(email, password, (error) => {
      if (error) return done(error)
      expect(error).to.be.null;
      fs.readFile(
        path.join(__dirname, "..", "data", "users", `${id}.json`),
        (error) => {
          expect(error).to.exist;
          done();
        });
    });
  }); 
});

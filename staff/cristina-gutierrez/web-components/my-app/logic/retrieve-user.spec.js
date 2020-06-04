describe("retrieveUser", function () {
    let name, surname, email, password;
  
    beforeEach(function () {
      users.length = 0;
  
      name = names.random();
      surname = surnames.random();
      email = `${name
        .toLowerCase()
        .split(" ")
        .join("")}${surname.toLowerCase().split(" ").join("")}@mail.com`;
      password = passwords.random();
  
      users.push({ name, surname, email, password });
    });
  
    //happypath
    it("should return the user that matches with the email input", function () {
      expect(function () {
        retrieveUser(email);
      }).not.to.Throw();
  
      const user = retrieveUser(email);
  
      expect(user).to.exist;
    });
  
    //unhappypath
    it("should throw error if email is not expected format", function () {
      expect(function () {
        retrieveUser(undefined);
      }).to.throw(Error, "undefined is not a string");
    });
  });
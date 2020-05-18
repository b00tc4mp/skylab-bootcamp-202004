 describe("searchUser", function () {
  let name, surname, email, password;

   beforeEach(function () {
    users.length = 0;

    name = names.random();
    surname = surnames.random();

    email = `${name
      .toLowerCase()
      .split(" ")
      .join("")}${surname.toLowerCase().split(" ").join("")}@mail.com`;

    users.push({
      name: name,
      surname: surname,

      email: email,
    });
  });
  
   it("must pass search and user and return a user", function () {
    expect(function () {
      searchUsers(name);
    }).not.to.throw(Error);

    expect(function () {
      searchUsers(email);
    }).not.to.throw(Error);

    expect(function () {
      searchUsers(surname);
    }).not.to.throw(Error);
  }); 
  it("must find and user and push to an array", function () {debugger
    
    
    expect(searchUsers(name)).to.be.an("array");

    expect(searchUsers(name).length).to.equal(1)
    expect(searchUsers(name)[0].name).to.equal(name)
    expect(searchUsers(name)[0].email).to.equal(email)
    expect(searchUsers(name)[0].surname).to.equal(surname)
  });



});

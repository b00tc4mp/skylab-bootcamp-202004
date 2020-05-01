describe("searchUser", () => {
  let tokenValue;
  beforeEach(() => {
    name = names.random();
    surname = surnames.random();
    email = `${name
      .toLowerCase()
      .split(" ")
      .join("")}${surname
      .toLowerCase()
      .split(" ")
      .join("")
      .concat("-")
      .concat(Math.random())}@mail.com`;
    password = passwords.random();

    call(
      "POST",
      "https://skylabcoders.herokuapp.com/api/v2/users/",
      `{{"name": "${name}" }, {"surname": "${surname}"}, {"username" : "${email}"},{"password": "${password}"}}`,
      { "Content-type": "application/json" },
      (error, status, body) => {
        if (error) return done(new Error(error));
        if (!status === 201) return done(new Error("unexpectet status"));

        call(
          "POST",
          "https://skylabcoders.herokuapp.com/api/v2/users/auth",
          `{{"username" : "${email}"},{"password": "${password}"}}`,
          { "Content-type": "application/json" },
          (error, status, body) => {
            if (error) return done(new Error(error));
            if (!status === 200) return done(new Error("Unexpectet status"));

            const { token } = JSON.parse(body);
            tokenValue = token;
          }
        );
      }
    );
  });

  it("should find all users and create an array.", (done) => {
    searchUsers ('query', 'token', () =>{console.log(status)})
    call("GET","https://skylabcoders.herokuapp.com/api/v2/users/all",
      undefined,
      { "Content-type": "application/json", Authorization: `Bearer: ${tokenValue}` },
      (error, status, body) => {
        if (error) return callback(error)
        if (status === 200) {
    
          const users = JSON.parse(body)}
    
          expect(users).to.exist
          expect(users.length).to.be.greaterThan(0)
    
         return done(users)
    
        })
      })
    
    

});






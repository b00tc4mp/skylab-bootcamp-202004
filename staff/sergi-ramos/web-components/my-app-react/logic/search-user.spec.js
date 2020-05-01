/*
describe("searchUser", () => {
    debugger;
    let tokenValue;
    let users;
    let email;
    let password;
    let name;
    let surname;

    beforeEach(done => {

        debugger;
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
        debugger;
        call("POST", "https://skylabcoders.herokuapp.com/api/v2/users/",
            `{{"name": "${name}" }, {"surname": "${surname}"}, {"username" : "${email}"},{"password": "${password}"}}`,
            { "Content-type": "application/json" },
            (error, status, body) => {
                if (error) return done(new Error(error));
                if (!status === 201) return done(new Error("unexpectet status"));

                debugger;
                call("POST", "https://skylabcoders.herokuapp.com/api/v2/users/auth",
                    `{{"username" : "${email}"},{"password": "${password}"}}`,
                    { "Content-type": "application/json" },
                    (error, status, body) => {
                        if (error) return done(new Error(error));
                        if (!status === 200) return done(new Error("Unexpectet status"));

                        const { token } = JSON.parse(body);
                        tokenValue = token;
                        done()

                    }
                );
            }
        );

    });
    debugger;
    it("should find all users and create an array.", (done) => {
        searchUsers('helena', tokenValue, () => {

        });
        call(
            "GET",
            "https://skylabcoders.herokuapp.com/api/v2/users/all",
            undefined,
            {
                "Content-type": "application/json",
                Authorization: `Bearer: ${tokenValue}`,
            },
            (error, status, body) => {
                if (error) return callback(error);
                if (status === 200) {
                    users = JSON.parse(body);
                }

                expect(users).to.exist;
                expect(users.length).to.be.greaterThan(0);

                done();
            }
        );
    });

    /*   afterEach(done => {
      call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
          `{ "username": "${email}", "password": "${password}" }`,
          { 'Content-type': 'application/json' },
          (error, status, body) => {
              if (error) return done(error)
              if (status !== 200) return done(new Error(`unexpected status ${status}`))
  
              const { token } = JSON.parse(body)
  
              call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                  `{ "password": "${password}" }`,
                  {
                      'Content-type': 'application/json',
                      Authorization: `Bearer ${token}`
                  },
                  (error, status, body) => {
                      if (error) return done(new Error(error.message))
                      if (status !== 204) return done(new Error(`undexpected status ${status}`))
  
                      done()
                  })
          })
  })
  
  
  
   
});*/


describe('searchUser', () => { 
    let name, surname, email, password, usersFound

    beforeEach( () => {
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({ name, surname, email, password })
    })

    it('should fail if is empty or blank', () => {    // do it with throw and try catch!!

        usersFound = searchUser(' ')
        
        expect(usersFound).to.be.an('array')
        expect(usersFound.length).to.equal(0)
    })

    it('should succes if registered user is searched', () => {     // do it with throw and try catch!!

        usersFound = searchUser(name)
        
        expect(usersFound).to.be.an('array')
        expect(usersFound.length).to.equal(1)
        expect(usersFound[0].name).to.equal(name)
        expect(usersFound[0].surname).to.equal(surname)
        expect(usersFound[0].email).to.equal(email)
        expect(usersFound[0].password).to.be.undefined
    })
})
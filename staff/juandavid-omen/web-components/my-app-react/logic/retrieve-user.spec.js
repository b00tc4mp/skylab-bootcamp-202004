describe("retrieveUser", function () {
    let name, surname, email, password;

    beforeEach(function () {
        users.length = 0;
        name = names.random();
        surname = surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat(Math.random())}@mail.com`;
        password = passwords.random();
    })
    it("should return the information of a specified user", (done) => {
        call("POST", "https://skylabcoders.herokuapp.com/api/v2/users", `{ "username": "${email}","password": "${password}", "name": "${name}", "surname": "${surname}" }`,
        { 'Content-type': 'application/json' },
        (error, status, body) => {
            call("POST", "https://skylabcoders.herokuapp.com/api/v2/users/auth", `{ "username": "${email}","password": "${password}" }`, { "Content-type": "application/json" }, 
            (error, status, body) => {
                const token = JSON.parse(body).token;
                retrieveUser(token, (error, user) => {
                    expect(error).to.be.undefined;
                    
                    expect(user.name).to.equal(name);
                    
                    expect(user.surname).to.equal(surname);
                    
                    expect(user.email).to.equal(email);

                    call("DELETE", "https://skylabcoders.herokuapp.com/api/v2/users", `{ "password": "${password}"}`, { "Content-type": "application/json", "Authorization": `Bearer ${token}` }, 
                    (error, status, body) => {
                    
                        expect(error).to.be.undefined;
                    
                        expect(status).to.equal(204);
                    
                        expect(body).to.equal("");
                    
                        done();
                    })
                })
            })

        })
    }).timeout(5000)
})
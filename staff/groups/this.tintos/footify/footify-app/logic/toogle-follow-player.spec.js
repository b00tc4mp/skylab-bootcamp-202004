describe.only("toogleFollowPlayer", () => {
  let name, surname, email, password, confirmPassword, playerId, _token, _playerId;

  const ids = ["MS10", "CR7", "SR4", "TH14", "FL7", "JR10", "TS1", "JA8", "SE4"];

  before(done => {
    name = names.random();
    surname = surnames.random()
    email = `${name.toLowerCase().split(" ").join("")}${surname.toLowerCase().split(" ").join("").concat("-").concat(Math.random())}@mail.com`;
    password = passwords.random()
    confirmPassword = password;

    playerId = ids.random();

    call("POST", "https://skylabcoders.herokuapp.com/api/v2/users",
    `{"name":"${name}","surname":"${surname}","username":"${email}","password":"${password}"} `,
      { "Content-type": "application/json" },(error, status, body) => {
        if (status !== 201)
          return done(new Error(`undexpected status ${status}`));

        //atuhenticate
        call("POST", "https://skylabcoders.herokuapp.com/api/v2/users/auth",`{ "username": "${email}", "password": "${password}" }`,
          { "Content-type": "application/json" },(error, status, body) => {
            if (status !== 200)
              return done(new Error(`undexpected status ${status}`));

              const { token } = JSON.parse(body);

              _token = token;

            done();
          }
        );
      }
    )
  ;
  });

  describe("When user exist", () => {
      
    it('Should check if user have "likes" array and add one player to this field', (done) => {
      toogleFollowPlayer(_token, playerId, (error, likes) => {
        expect(error).to.be.undefined;
        expect(likes).to.exist;
        expect(likes[0]).to.equal(playerId);
        expect(likes[0]).to.be.a("string");

        done();
      });
    });

    it('Should check if user have the player id in the array and then take it out', (done) => {
      toogleFollowPlayer(_token, playerId, (error, likes) => {
        expect(error).to.be.undefined;
        expect(likes).to.exist;
        expect(likes).to.be.instanceof(Array)
        expect(likes.length).to.equal(0)
      
        
        done();
        });


      });
  });


  after((done) => {
      call("POST", "https://skylabcoders.herokuapp.com/api/v2/users/auth", `{ "username": "${email}", "password": "${password}" }`,
        { "Content-type": "application/json" }, (error, status, body) => {
          if (error) return done(error);
          if (status !== 200)
            return done(new Error(`unexpected status ${status}`));

            const { token } = JSON.parse(body);

          call("DELETE", "https://skylabcoders.herokuapp.com/api/v2/users", `{ "password": "${password}" }`,
            {"Content-type": "application/json", Authorization: `Bearer ${token}` },
            (error, status, body) => {
              if (error) return done(new Error(error.message));
              if (status !== 204)
                return done(new Error(`undexpected status ${status}`));

              done();
            }
          );
        }
      )
  })
})

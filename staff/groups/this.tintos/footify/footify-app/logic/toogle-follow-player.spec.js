describe("toogleFollowPlayer", () => {
  let name, surname, email, password, confirmPassword, playerId, _token;
  const ids = ["MS10", "CR7", "SR4", "TH14", "FL7", "JR10", "TS1", "JA8", "SE4"];

  beforeEach(() => {
    name = names.random();
    surname = `surname-${Math.random()}`;
    email = `${name.toLowerCase().split(" ").join("")}${surname.toLowerCase().split(" ").join("").concat("-").concat(Math.random())}@mail.com`;
    password = `password-${Math.random()}`;
    confirmPassword = password;

    playerId = ids.random();
  });

  describe("When user exist", () => {
    beforeEach((done) =>
      //register
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
    );
      
    it('Should check if user have "likes" array and add one player to this field', (done) => {
      toogleFollowPlayer(_token, playerId, (error, likes) => {
        expect(error).to.be.undefined;
        expect(likes).to.exist;
        expect(likes[0]).to.equal(playerId);
        expect(likes[0]).to.be.a("string");

        done();
      });
    });
    //TODO new scenario and impement beforeEach
    // describe()
    //   beforeEach()
    // call("PATCH", "https://skylabcoders.herokuapp.com/api/v2/users", JSON.stringify({likes: ids}),
    // {"Content-type": "application/json", Authorization: `Bearer ${_token}`},(error, status) => {
    //   if (error) return done(new Error(error.message));
      
    //   if (status === 204) {
    //     it("Should check if user unlike the player already on the array", (done) => {
    //       toogleFollowPlayer(_token, playerId, (error) => {
    //       if (error) return done(new Error(error.message));
          
    //           call("GET", "https://skylabcoders.herokuapp.com/api/v2/users", undefined,
    //             { Authorization: `Bearer ${_token}` },(error, status, body) => {
    //               if (error) return done(new Error(error.message));

    //               if (status === 200) {
                    
    //                 let { likes } = JSON.parse(body);
    //                 expect(likes).to.exist;
    //                 expect(likes).to.be.an.instanceOf(Array);
    //                 expect(likes.length).to.be(0);
    //                 expect(likes).to.not.include(playerId);

    //                 done();
    //               }
    //             }
    //           );
    //         });
    //       }
    //     }
    //   );
    // });

    afterEach((done) => {
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
      );
    });
  });
});

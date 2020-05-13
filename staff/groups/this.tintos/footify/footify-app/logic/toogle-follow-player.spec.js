describe.only('toogleFollowPlayer', () => {
    let _name, surname, email, password

    beforeEach(() => {
        _name = names.random();
        surname = surnames.random();
        email = `${_name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`;
        password = passwords.random();
    })

    describe('Async Test', () => {

        it('Should succeed on correct data', done => {


            call("GET","https://skylabcoders.herokuapp.com/api/v2/users",undefined,
              { Authorization: `Bearer ${token}` }, (error, status, body) => {
               if (error) return callback(error);

              if (status === 200) {
             const user = JSON.parse(body);

              const { likes = [] } = user

              const actualIndex = likes.indexOf(playerId);

              if (actualIndex !== -1) likes.splice(actualIndex, 1);  
              else likes.push(playerId)
              user.likes = likes

             call("PATCH", "https://skylabcoders.herokuapp.com/api/v2/users", JSON.stringify( user ),
               { Authorization: `Bearer ${token}`, "Content-type": "application/json"},
               (error, status, body) => {
                 if (error) return callback(error);

                 if (status === 204) {
                   callback(undefined, likes);
                 } else {
                   const { error } = JSON.parse(body);

                   callback(new Error(error));
            }
          }
        );
      }
    }
  );
        })


        
        afterEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                (error, status, body) => {

                    if (error) return done(error)
                    if (status !== 200) return done(new Error(`unexpected status ${status}`))

                    const { token } = JSON.parse(body)

                    call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        `{ "password": "${password}" }`, {
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
    })
})
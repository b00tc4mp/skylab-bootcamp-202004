describe('Authenticate - User', () => {
    let _name, _surname, email, password, _token;

    beforeEach(() => {
        _name = names.random()
        _surname = surnames.random()
        _email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name": "${_name}", "surname": "${_surname}", "username": "${_email}", "password": "${password}"`,
                { 'Content-type': 'application/json' },
                (error, status) => {
                    if (error) return done(new Error(error.message));
                    if (status !== 201) return done(new Error(`undexpected status ${status}`));

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username" : "${email}", "password" : "${password}"}`, 
                    { 'Content-type': 'application/json' }, (error, status, body) => {
                        if (error) return done(new Error(error.message));
                        if (status !== 200) return done(new Error(`undexpected status ${status}`));
                        let { token } = JSON.parse(body);
                        _token = token;

                        done();
                    });
                });

            it('should succeed on correct credentials', done => {

                retrieveUser(token, (error, { name, surname, email, likes}) => {
                    expect(error).to.be.undefined;
                    expect(token).to.be.a('string');
                    expect(likes).to.exist
                    expect(likes).to.be([])
                    expect(likes).to.be.a('string');

                    expect(name).to.equal(_name);
                    expect(surname).to.equal(_surname);
                    expect(email).to.equal(_email);

                    done();

                })

            })



            it('should fail on incorrect token', done => {
                const _token = true

                retrieveUser(_token, (error) => {
                    expect(error).to.be.an.instanceOf(Error);



                    done();
                });
            });

        });



          afterEach(done => {
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
    });

});
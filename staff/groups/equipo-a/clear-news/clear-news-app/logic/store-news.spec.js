describe.only('storeNews', () => {
    let name, surname, email, password, categories, country, _token, title

    beforeEach(()=> {
        name = names.random();
        surname = surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`;
        password = passwords.random();
        categories = {
            business: true,
            entertainment: false,
            general: false,
            health: true,
            science: false,
            sports: false,
            technology: true
        }
        
        country = countries.random()
        title="random title";
    })    
    describe('when both user exist', () => {
        beforeEach(done => {

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{"name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}", "categories": ${JSON.stringify(categories)}, "country": "${country}"}`,
                { "Content-type": 'application/json' }, (error, status) => {
                    if (error) return done(new Error(error.message));

                    if (status === 201) {

                        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                            `{"username":"${email}","password":"${password}"}`,
                            { "Content-type": 'application/json' }, (error, status, body) => {
                                if (error) return done(new Error(error.message));

                                if (status === 200) {
                                    let { token } = JSON.parse(body);
                                    _token = token;
                                    done();
                                }    
                            });
                    }
                });
            });

        it('should succed on adding favorite', done => {
        debugger
            storeNews(_token, title, (error) => {
                if (error) return done(new Error(error.message));

                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    undefined,
                    { 'Authorization': `Bearer ${_token}` }, (error, status, body) => {
                        if (error) return done(new Error(error.message));
                        if (status === 200) {

                            let { favorite } = JSON.parse(body);
                            expect(favorite).to.exist;
                            expect(favorite).to.be.an.instanceOf(Array);
                            expect(favorite).to.include(title);

                            done();
                        }
                    })
            })
        })

        it('should remove favorite', () => {
            beforeEach(done => {
            call('PATCH',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                `"favorite":"${title}"`,
                { "Content-type": "application/json", "Authorization": `Bearer ${_token}` },
                (error, status,body) => {
                    if (error) return done(new Error(error.message));

                    if (status === 200) {
                        storeNews(_token, title, (error) => {
                            if (error) return done(new Error(error.message));

                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                                undefined,
                                { 'Authorization': `Bearer ${_token}` }, (error, status, body) => {
                                    if (error) return done(new Error(error.message));

                                    if (status === 200) {

                                        debugger
                                        let { favorite } = JSON.parse(body);
                                        expect(favorite).to.exist;
                                        expect(favorite).to.be.an.instanceOf(Array);
                                        expect(favorite.length).to.be(0);
                                        expect(favorite).to.not.include(title);
                                       
                                        done();
                                    }
                                });
                        });
                    }
                });
              
            });
    });
});
})
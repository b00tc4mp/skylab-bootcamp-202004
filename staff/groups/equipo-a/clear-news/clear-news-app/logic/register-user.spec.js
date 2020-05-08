describe('registerUser', () => {
    let name, surname, email, password, categories, country

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split('').join('')}${surname.toLowerCase().split('').join('').concat(Math.random())}@SpeechGrammarList.com`
        password = passwords.random();
        categories = {
            business: true,
            entertainment: true,
            general: false,
            health: false,
            science: true,
            sports: false,
            technology: true
        }
        country = countries.random();
    });

    describe('when user already exists', () => {
        it('should succed on correct data', done => {
            registerUser(name, surname, email, password, categories, country, error => {
                expect(error).to.be.undefined;

                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                    `{ "username": "${email}", "password": "${password}" }`,
                    { 'Content-type': 'application/json' },
                    (error, status, body) => {
                       
                        expect(error).to.be.undefined;// ambos expect no van
                        expect(status).to.equal(200); // 

                        //if (error)done(error)
                        //if(status !== 200) done (new error)
                        const { token } = JSON.parse(body);

                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                            undefined,
                            { Authorization: `Bearer ${token}` },
                            (error, status, body) => {
                                expect(error).to.be.undefined;// idem
                                expect(status).to.equal(200); // iodem

                                const {name: _name, surame, etc} = body
                                expect(_name).to.equal(name)

                                done()
                            }
                        )
                    });
            });

        });
        /* afterEach(done => {
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
                        (error, status) => {
                            if (error) return done(new Error(error.message))
                            if (status !== 204) return done(new Error(`undexpected status ${status}`))
    
                            done()
                        })
                })
        }) */
    });

    describe('when user already exists', () => {
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}", "categories": "${categories}", "categories":"${country}" }`,
                { 'Content-type': 'application/json' },
                (error, status) => {
                    if (error) return done(new Error(error.message));
                    if (status !== 201) return done(new Error(`undexpected status ${status}`));

                    done()
                });
        });

        it('should fail alerting user already exists', done => {
            registerUser(name, surname, email, password, categories, country, error => {
                expect(error).to.exist;

                expect(error.message).to.equal(`user with username \"${email}\" already exists`);

                done()
            });
        });
        /* afterEach(done => {
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
                        (error, status) => {
                            if (error) return done(new Error(error.message))
                            if (status !== 204) return done(new Error(`undexpected status ${status}`))
    
                            done()
                        })
                })
        }) */
    });
    /* afterEach(done => {
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
                    (error, status) => {
                        if (error) return done(new Error(error.message))
                        if (status !== 204) return done(new Error(`undexpected status ${status}`))

                        done()
                    })
            })
    }) */

    it('should fail on non-string field', () => {
        expect(() => {
            registerUser(undefined, surname, email, password, categories, country, function () { })
        }).to.throw(TypeError, 'undefined is not a string');

        expect(() => {
            registerUser(1, surname, email, password, categories, country, function () { })
        }).to.throw(TypeError, '1 is not a string');

        expect(() => {
            registerUser(true, surname, email, password, categories, country, function () { })
        }).to.throw(TypeError, 'true is not a string');

        expect(() => {
            registerUser(name, undefined, email, password, categories, country, function () { })
        }).to.throw(TypeError, 'undefined is not a string');

        expect(() => {
            registerUser(name, 1, email, password, categories, country, function () { })
        }).to.throw(TypeError, '1 is not a string');

        expect(() => {
            registerUser(name, true, email, password, categories, country, function () { })
        }).to.throw(TypeError, 'true is not a string');

        expect(() => {
            registerUser(name, surname, 1, password, categories, country, function () { })
        }).to.throw(Error, '1 is not an e-mail');

        expect(() => {
            registerUser(name, surname, true, password, categories, country, function () { })
        }).to.throw(Error, 'true is not an e-mail');

        expect(() => {
            registerUser(name, surname, email, undefined, categories, country, function () { })
        }).to.throw(TypeError, 'undefined is not a string');

        expect(() => {
            registerUser(name, surname, email, 1, categories, country, function () { })
        }).to.throw(TypeError, '1 is not a string');

        expect(() => {
            registerUser(name, surname, email, true, categories, country, function () { })
        }).to.throw(TypeError, 'true is not a string');

        expect(() => {
            registerUser(name, surname, email, 1, categories, country, function () { })
        }).to.throw(TypeError, '1 is not a string');

        /* expect(() => {
            registerUser(name, surname, email, password, true, country, function () { })
        }).to.throw(Error, 'true is not a string');
 */
        expect(() => {
            registerUser(name, surname, email, password, categories, undefined, function () { })
        }).to.throw(TypeError, 'undefined is not a string');

        expect(() => {
            registerUser(name, surname, email, password, categories, 1, function () { })
        }).to.throw(TypeError, '1 is not a string');

        expect(() => {
            registerUser(name, surname, email, password, categories, true, function () { })
        }).to.throw(TypeError, 'true is not a string');

    })

    it('should fail on non-alphabetic field', () => {
        expect(() => {
            registerUser(name, surname, '1', password, categories, country, function () { })
        }).to.throw(Error, '1 is not an e-mail');

        expect(() => {
            registerUser(name, surname, '$', password, categories, country, function () { })
        }).to.throw(Error, '$ is not an e-mail');

        expect(() => {
            registerUser(name, surname, '%', password, categories, country, function () { })
        }).to.throw(Error, '% is not an e-mail');

        expect(() => {
            registerUser(name, surname, '&', password, categories, country, function () { })
        }).to.throw(Error, '& is not an e-mail');

        expect(() => {
            registerUser(name, surname, '(', password, categories, country, function () { })
        }).to.throw(Error, '( is not an e-mail');

        expect(() => {
            registerUser(name, surname, '?', password, categories, country, function () { })
        }).to.throw(Error, '? is not an e-mail');

        expect(() => {
            registerUser(name, surname, email, '1', categories, country, function () { })
        }).to.throw(Error, '"1" length is not greater or equal than 8');

        expect(() => {
            registerUser(name, surname, email, '$', categories, country, function () { })
        }).to.throw(Error, '"$" length is not greater or equal than 8');

        expect(() => {
            registerUser(name, surname, email, '%', categories, country, function () { })
        }).to.throw(Error, '"%" length is not greater or equal than 8');

        expect(() => {
            registerUser(name, surname, email, '&', categories, country, function () { })
        }).to.throw(Error, '"&" length is not greater or equal than 8');

        expect(() => {
            registerUser(name, surname, email, '(', categories, country, function () { })
        }).to.throw(Error, '"(" length is not greater or equal than 8');

        expect(() => {
            registerUser(name, surname, email, '?', categories, country, function () { })
        }).to.throw(Error, '"?" length is not greater or equal than 8');
    })

    it('should fail on non-function callback', () => {
        expect(() => {
            registerUser(name, surname, email, password, categories, country, 1)
        }).to.throw(TypeError, '1 is not a function');

        expect(() => {
            registerUser(name, surname, email, password, categories, country, true)
        }).to.throw(TypeError, 'true is not a function');

        expect(() => {
            registerUser(name, surname, email, password, categories, country, 'text')
        }).to.throw(TypeError, 'text is not a function');

        expect(() => {
            registerUser(name, surname, email, password, categories, country)
        }).to.throw(TypeError, 'undefined is not a function');
    })


})
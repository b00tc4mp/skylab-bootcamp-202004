describe('storeNews', () => {
    let name, surname, email, password, categories, country, _token, title

    beforeEach(done => {
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

        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{"name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}", "categories": ${JSON.stringify(categories)}, "country": "${country}"}`,
            { "Content-type": 'application/json' }, (error, state) => {
                if (error) return done(new Error(error.message));

                if (state === 201) {

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{"username":"${email}","password":"${password}"}`,
                        { "Content-type": 'application/json' }, (error, state, body) => {
                            if (error) return done(new Error(error.message));

                            if (state === 200) {
                                let { token } = JSON.parse(body);
                                _token = token;
                                done();
                            }
                        });
                }
            })

    })

    it('should succed on adding favorite', done => {
        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
            undefined,
            { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                expect(error).to.be.undefined
                expect(state).to.equal(200)
                expect(body).to.exist

                const { favorite } = JSON.parse(body)

                expect(favorite).to.be.undefined

                title = "hola mundo"

                storeNews(_token, title, (error) => {
                    expect(error).to.be.undefined

                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        undefined,
                        { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                            expect(error).to.be.undefined
                            expect(state).to.equal(200)
                            expect(body).to.exist

                            const { favorite } = JSON.parse(body);

                            expect(favorite).to.exist;
                            expect(favorite).to.be.an.instanceOf(Array);
                            expect(favorite).to.include(title);
                            expect(favorite.length).to.be.greaterThan(0)
                            expect(favorite[0]).to.be.an('string')

                            done();

                        })
                })
            })
    })

    it('should remove favorite', done => {
        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
            undefined,
            { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                expect(error).to.be.undefined
                expect(state).to.equal(200)
                expect(body).to.exist

                const user = JSON.parse(body)

                expect(user.favorite).to.be.undefined

                title = 'hola mundo'

                call('PATCH',
                    'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{"favorite": ["${title}"]}`,
                    { "Content-type": "application/json", "Authorization": `Bearer ${_token}` },
                    (error, state, body) => {
                        expect(error).to.be.undefined
                        expect(state).to.equal(204)

                        storeNews(_token, title, (error) => {
                            expect(error).to.be.undefined

                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                                undefined,
                                { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                                    expect(error).to.be.undefined
                                    expect(state).to.equal(200)
                                    expect(body).to.exist


                                    const { favorite } = JSON.parse(body);

                                    expect(favorite).to.exist;
                                    expect(favorite).to.be.an.instanceOf(Array);
                                    expect(favorite.length).to.equal(0);
                                    expect(favorite).to.not.include(title);

                                    done();

                                });
                        });

                    });
            })
    });

    it('should fail if invalid token is introduced', done => {
        const __token = 'aaaaaaaaaaaa'

        headline = 'hola mundo'

        storeNews(__token, title, error => {

            expect(error).to.exist
            expect(error.message).to.equal('invalid token')

            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                undefined,
                { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                    expect(error).to.be.undefined
                    expect(state).to.equal(200)
                    expect(body).to.exist

                    const user = JSON.parse(body)

                    expect(user.title).to.be.undefined

                    done()

                })
        })

    })


    it('should return an error when the token is empty or blank', () => {
        let __token = '  '
        title = 'hola mundo'

        expect(function () {
            storeNews(__token, title, function () { })
        }).to.throw(Error, `${__token} is empty or blank`)

        __token = ''
        expect(function () {
            storeNews(__token, title, function () { })
        }).to.throw(Error, `${__token} is empty or blank`)
    })

    it('should return an error when title is not a string', () => {
        title = true

        expect(function () {
            storeNews(_token, title, function () { })
        }).to.throw(TypeError, `${title} is not a string`)

        title = undefined

        expect(function () {
            storeNews(_token, title, function () { })
        }).to.throw(TypeError, `${title} is not a string`)

        title = 11

        expect(function () {
            storeNews(_token, title, function () { })
        }).to.throw(TypeError, `${title} is not a string`)
    })

    it('should return an error when callback is not a function', () => {
        title = "hola mundo"

        expect(function () {
            storeNews(_token, title, undefined)
        }).to.throw(TypeError, `undefined is not a function`)

        expect(function () {
            storeNews(_token, title, 'my news')
        }).to.throw(TypeError, `my news is not a function`)

        expect(function () {
            storeNews(_token, title, 22)
        }).to.throw(TypeError, `22 is not a function`)
    })

    afterEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{ "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, state, body) => {
                if (error) return done(error)
                if (state !== 200) return done(new Error(`unexpected state ${state}`))

                const { token } = JSON.parse(body)

                call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "password": "${password}" }`,
                    {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    (error, state, body) => {
                        if (error) return done(new Error(error.message))
                        if (state !== 204) return done(new Error(`undexpected state ${state}`))

                        done()
                    })
            })
    })

})
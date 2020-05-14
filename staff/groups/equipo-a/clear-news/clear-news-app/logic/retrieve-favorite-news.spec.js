describe('retrieveFavoriteNews', () => {
    let name, surname, email, password, categories, country, _token

    beforeEach(() => {
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
    })

    describe('when favorites exists', () => {
        beforeEach(done => {
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
                                    const { token } = JSON.parse(body);
                                    _token = token;
                                    done();
                                }
                            });
                    }
                })
        })

        it('should return an array with titles of favorite news', done => {
            const favorite = "Apple Music's web player is out of beta"

            call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"favorite": ["${favorite}"]}`,
                { "Content-type": "application/json", "Authorization": `Bearer ${_token}` },
                (error, state, body) => {
                    expect(error).to.be.undefined;
                    expect(state).to.equal(204);

                    retrieveFavNews(_token, (error, favNews) => {
                        expect(error).to.be.undefined;
                        expect(favNews.length).to.be.greaterThan(0);

                        done()
                    })
                })
        })

        it("should return an error because the token is invalid", done => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI0MDVmYjg2MmJkNTAwMTU5ODQ0NGMiLCJpYXQiOjE1ODg5NDg3NDgsImV4cCI6MTU4ODk1MjM0OH0'

            retrieveFavNews(token, (error, favNews) => {
                expect(error).to.exist;
                expect(error.message).to.equal('invalid token');
                expect(favNews).to.be.undefined;

                done()
            })
        })

        it('should return an error when the token is empty or blank', () => {
            let __token = '  '
            expect(function () {
                retrieveFavNews(__token, function () { })
            }).to.throw(Error, `${__token} is empty or blank`)

            __token = ''
            expect(function () {
                retrieveFavNews(__token, function () { })
            }).to.throw(Error, `${__token} is empty or blank`)
        })

        it('should return an error when headline is not a function', () => {

            expect(function () {
                retrieveFavNews(_token, undefined)
            }).to.throw(TypeError, `undefined is not a function`)

            expect(function () {
                retrieveFavNews(_token, 'my news')
            }).to.throw(TypeError, `my news is not a function`)

            expect(function () {
                retrieveFavNews(_token, 22)
            }).to.throw(TypeError, `22 is not a function`)

        })

    })

    afterEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{ "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return done(error);
                if (status !== 200) return done(new Error(`unexpected status ${status}`));
                const { token } = JSON.parse(body);

                call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "password": "${password}" }`,
                    {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    (error, status, body) => {
                        if (error) return done(new Error(error.message));
                        if (status !== 204) return done(new Error(`undexpected status ${status}`));

                        done()
                    })
            })
    })

})
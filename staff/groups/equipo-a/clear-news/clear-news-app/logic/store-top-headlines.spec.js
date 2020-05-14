describe('storeTopHeadlines', () => {
    let name, surname, email, password, categories, country, _token, headline

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
            { "Content-type": 'application/json' }, (error, status) => {
                if (error) return done(new Error(error.message));

                if (status === 201) {

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{"username":"${email}","password":"${password}"}`,
                        { "Content-type": 'application/json' }, (error, status, body) => {
                            if (error) return done(new Error(error.message));

                            if (status === 200) {
                                const { token } = JSON.parse(body);
                                _token = token;
                                done();
                            }
                        });
                }
            })

    })

    it('should add the headline object in the user', done => {
        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
            undefined,
            { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                expect(error).to.be.undefined;
                expect(state).to.equal(200);
                expect(body).to.exist;

                const user = JSON.parse(body);

                expect(user.headlines).to.be.undefined;

                headline = {
                    name: "Svenska Dagbladet",
                    title: "Ljuger jag lika mycket som Trump?",
                    url: "https://www.svd.se/ljuger-jag-lika-mycket-som-trump",
                    urlImage: "https://svd.vgc.no/v2/images/d2c58bce-0bea-4dd2-8650-15ae63509518?h=630&q=80&upscale=true&w=1200&s=d2214948276275c43e5be7721508a6977bd3b494",
                }

                storeTopHeadlines(_token, headline, error => {
                    expect(error).to.be.undefined;

                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
                        { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                            expect(error).to.be.undefined;
                            expect(state).to.equal(200);
                            expect(body).to.exist;

                            const user = JSON.parse(body);

                            expect(user.headlines).to.exist;
                            expect(user.headlines.length).to.be.greaterThan(0);

                            expect(user.headlines[0].name).to.be.an('string');
                            expect(user.headlines[0].title).to.be.an('string');
                            expect(user.headlines[0].url).to.be.an('string');
                            expect(user.headlines[0].urlImage).to.be.an('string');
                            expect(user.headlines[0].name).to.equal(headline.name);
                            expect(user.headlines[0].title).to.equal(headline.title);
                            expect(user.headlines[0].url).to.equal(headline.url);
                            expect(user.headlines[0].urlImage).to.equal(headline.urlImage);

                            done()

                        })
                })
            }
        )
    })

    it('should remove the headline object in the user', done => {
        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
            undefined,
            { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                expect(error).to.be.undefined;
                expect(state).to.equal(200);
                expect(body).to.exist;

                const user = JSON.parse(body);

                expect(user.headlines).to.be.undefined;

                headline = {
                    name: "Associated Press",
                    title: "Flynn case boosts Trump's bid to undo Russia probe narrative",
                    url: "https://apnews.com/ebcd45c5d89ac3cf8cc61ed3d6e1ac1a",
                    urlImage: "https://cdn.cnn.com/cnnnext/dam/assets/200512105313-01-senate-help-committee-hearing-0512-unfurled-super-tease.jpg",
                }

                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', `{"headlines" : [${JSON.stringify(headline)}]}`,
                    { 'Content-type': 'application/json', 'Authorization': `Bearer ${_token}` },
                    (error, status, body) => {
                        expect(error).to.be.undefined;
                        expect(status).to.equal(204);

                        storeTopHeadlines(_token, headline, error => {
                            expect(error).to.be.undefined;

                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
                                { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                                    expect(error).to.be.undefined;
                                    expect(state).to.equal(200);
                                    expect(body).to.exist;

                                    const user = JSON.parse(body);

                                    expect(user.headlines).to.exist;
                                    expect(user.headlines.length).to.equal(0);

                                    done()

                                })
                        })
                    })

            })

    })

    it('should fail if invalid token is introduced', done => {
        const __token = 'aaaaaaaaaaaa'

        headline = {
            name: "Svenska Dagbladet",
            title: "Ljuger jag lika mycket som Trump?",
            url: "https://www.svd.se/ljuger-jag-lika-mycket-som-trump",
            urlImage: "https://svd.vgc.no/v2/images/d2c58bce-0bea-4dd2-8650-15ae63509518?h=630&q=80&upscale=true&w=1200&s=d2214948276275c43e5be7721508a6977bd3b494",
        }

        storeTopHeadlines(__token, headline, error => {

            expect(error).to.exist;
            expect(error.message).to.equal('invalid token');

            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                undefined,
                { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                    expect(error).to.be.undefined;
                    expect(state).to.equal(200);
                    expect(body).to.exist;

                    const user = JSON.parse(body);

                    expect(user.headlines).to.be.undefined;

                    done()

                })
        })

    })

    it('should return an error when the token is empty or blank', () => {
        let __token = '  '
        expect(function () {
            storeTopHeadlines(__token, {}, function () { })
        }).to.throw(Error, `${__token} is empty or blank`)

        __token = ''
        expect(function () {
            storeTopHeadlines(__token, {}, function () { })
        }).to.throw(Error, `${__token} is empty or blank`)
    })

    it('should return an error when headline is not an object', () => {
        headline = 'news'

        expect(function () {
            storeTopHeadlines(_token, headline, function () { })
        }).to.throw(TypeError, `${headline} is not an object`)

        headline = undefined

        expect(function () {
            storeTopHeadlines(_token, headline, function () { })
        }).to.throw(TypeError, `${headline} is not an object`)

        headline = 11

        expect(function () {
            storeTopHeadlines(_token, headline, function () { })
        }).to.throw(TypeError, `${headline} is not an object`)
    })

    it('should return an error when headline is not a function', () => {
        headline = {
            name: "Svenska Dagbladet",
            title: "Ljuger jag lika mycket som Trump?",
            url: "https://www.svd.se/ljuger-jag-lika-mycket-som-trump",
            urlImage: "https://svd.vgc.no/v2/images/d2c58bce-0bea-4dd2-8650-15ae63509518?h=630&q=80&upscale=true&w=1200&s=d2214948276275c43e5be7721508a6977bd3b494",
        }

        expect(function () {
            storeTopHeadlines(_token, headline, undefined)
        }).to.throw(TypeError, `undefined is not a function`)

        expect(function () {
            storeTopHeadlines(_token, headline, 'my news')
        }).to.throw(TypeError, `my news is not a function`)

        expect(function () {
            storeTopHeadlines(_token, headline, 22)
        }).to.throw(TypeError, `22 is not a function`)
    })


    afterEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{ "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, state, body) => {
                if (error) return done(error)
                if (state !== 200) return done(new Error(`unexpected status ${state}`))

                const { token } = JSON.parse(body)

                call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "password": "${password}" }`,
                    {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    (error, state, body) => {
                        if (error) return done(new Error(error.message))
                        if (state !== 204) return done(new Error(`undexpected status ${state}`))

                        done()
                    })
            })
    })


})
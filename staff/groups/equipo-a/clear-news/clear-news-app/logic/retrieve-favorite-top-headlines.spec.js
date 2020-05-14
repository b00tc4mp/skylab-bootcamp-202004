describe.only('retrieveFavoriteTopHeadlines', () => {
    let name, surname, email, password, categories, country, _token

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

    it("should retirn a news stored in a headlines array ", done => {
        let headline = {
            name: "Svenska Dagbladet",
            title: "Ljuger jag lika mycket som Trump?",
            url: "https://www.svd.se/ljuger-jag-lika-mycket-som-trump",
            urlImage: "https://svd.vgc.no/v2/images/d2c58bce-0bea-4dd2-8650-15ae63509518?h=630&q=80&upscale=true&w=1200&s=d2214948276275c43e5be7721508a6977bd3b494",
        }

        call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', `{"headlines" : [${JSON.stringify(headline)}]}`,
            { 'Content-type': 'application/json', 'Authorization': `Bearer ${_token}` },
            (error, status, body) => {
                expect(error).to.be.undefined
                expect(status).to.equal(204)

                retrieveFavoriteTopHeadlines(_token, (error, headlines) => {
                    expect(error).to.be.undefined

                    expect(headlines.length).to.be.greaterThan(0)

                    const [{ name, title, url, urlImage }] = headlines

                    expect(name).to.be.an('string')
                    expect(title).to.be.an('string')
                    expect(url).to.be.an('string')
                    expect(urlImage).to.be.an('string')

                    expect(name).to.equal(headline.name)
                    expect(title).to.equal(headline.title)
                    expect(url).to.equal(headline.url)
                    expect(urlImage).to.equal(headline.urlImage)


                    done()

                })

            })

    })

    it("should return an error because the token is invalid", done => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI0MDVmYjg2MmJkNTAwMTU5ODQ0NGMiLCJpYXQiOjE1ODg5NDg3NDgsImV4cCI6MTU4ODk1MjM0OH0'

        retrieveFavoriteTopHeadlines(token, (error, favNews) => {
            expect(error).to.exist
            expect(error.message).to.equal('invalid token')

            expect(favNews).to.be.undefined

            done()
        })
    })

    it('should return an error when the token is empty or blank', () => {
        let __token = '  '
        expect(function () {
            retrieveFavoriteTopHeadlines(__token, function () { })
        }).to.throw(Error, `${__token} is empty or blank`)

        __token = ''
        expect(function () {
            retrieveFavoriteTopHeadlines(__token, function () { })
        }).to.throw(Error, `${__token} is empty or blank`)
    })

    it('should return an error when headline is not a function', () => {

        expect(function () {
            retrieveFavoriteTopHeadlines(_token, undefined)
        }).to.throw(TypeError, `undefined is not a function`)

        expect(function () {
            retrieveFavoriteTopHeadlines(_token, 'my news')
        }).to.throw(TypeError, `my news is not a function`)

        expect(function () {
            retrieveFavoriteTopHeadlines(_token, 22)
        }).to.throw(TypeError, `22 is not a function`)

    })

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
})
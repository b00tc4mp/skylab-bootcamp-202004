describe('search-news', () => {
    let name, surname, email, password, favorite, query, sortBy, language, counter, _token;

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
        favorite = ["Economista: denuncia de EEUU contra criptomoneda de Telegram busca asegurar hegemonía de Washington"];
        query = "ps5";
        sortBy = undefined;
        language = "en";
        counter;
        _token;

    })

    describe("create and validate token", () => {
        beforeEach(done => {

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{  "username": "${email}", "password": "${password}", "favorite": "${favorite}"}`,
                { 'Content-type': 'application/json' },
                (error, status) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{ "username": "${email}", "password": "${password}" }`,
                        { 'Content-type': 'application/json' },
                        (error, status, body) => {
                            if (error) return done(new Error(error.message));
                            if (status !== 200) return done(new Error(`undexpected status ${status}`));

                            const { token } = JSON.parse(body);
                            _token = token


                            done()
                        })
                })

        })

        it('should succeed on language', done => {

            searchNews(_token, query, language, sortBy, (error, articles, pages) => {
                expect(error).to.be.undefined

                expect(articles).to.exist;
                expect(articles).to.be.an("array");
                expect(articles[0]).to.be.instanceOf(Object)
                expect(articles.length).to.be.greaterThan(0);
                expect(pages).to.exist;
                expect(pages).to.be.an("array");
                expect(pages.length).to.be.greaterThan(0);
                expect(pages[0]).to.be.an("number")


                done();
            })
        })

        it('should fail on invalid token', done => {
            const __token = "hola"
            searchNews(__token, query, language, sortBy, (error, articles, pages) => {
                expect(error).to.exist
                expect(error.message).to.equal('invalid token')

                expect(articles).to.be.undefined
                expect(pages).to.be.undefined

                done()
            })
        })

        it('should return an error when the token is empty or blank', () => {
            let __token = '  ';

            expect(function () {
                searchNews(__token, query, language, sortBy, function () { })
            }).to.throw(Error, `${__token} is empty or blank`)

            __token = ''
            expect(function () {
                searchNews(__token, query, language, sortBy, function () { })
            }).to.throw(Error, `${__token} is empty or blank`)
        })

        it('should return an error when query empty or blank', () => {
            query = "  "
            expect(function () {
                searchNews(_token, query, language, sortBy, function () { })
            }).to.throw(Error, `${query} is empty or blank`)

            query = ''

            expect(function () {
                searchNews(_token, query, language, sortBy, function () { })
            }).to.throw(Error, `${query} is empty or blank`)

        })

        it('should return an error when query is not a string', () => {
            query = 123
            expect(function () {
                searchNews(_token, query, language, sortBy, function () { })
            }).to.throw(TypeError, `${query} is not a string`)

            query = true
            expect(function () {
                searchNews(_token, query, language, sortBy, function () { })
            }).to.throw(TypeError, `${query} is not a string`)

            query = undefined
            expect(function () {
                searchNews(_token, query, language, sortBy, function () { })
            }).to.throw(TypeError, `${query} is not a string`)

        })

        it('should return an error when callback is not a function', () => {
            expect(function () {
                searchNews(_token, query, language, sortBy, undefined)
            }).to.throw(TypeError, `undefined is not a function`)

            expect(function () {
                searchNews(_token, query, language, sortBy, 'my news')
            }).to.throw(TypeError, `my news is not a function`)

            expect(function () {
                searchNews(_token, query, language, sortBy, 22)
            }).to.throw(TypeError, `22 is not a function`)
        })

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
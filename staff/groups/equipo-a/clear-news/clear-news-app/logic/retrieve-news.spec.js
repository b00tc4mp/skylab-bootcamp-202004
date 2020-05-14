describe('retrieveNews', () => {
    let name, surname, email, password, categories, country, _token

    beforeEach(done => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
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
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return done(new Error(error.message))
                if (status !== 201) return done(new Error(`undexpected status ${status}`))
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username" : "${email}", "password" : "${password}"}`, { 'Content-type': 'application/json' }, (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 200) return done(new Error(`undexpected status ${status}`))
                    const { token } = JSON.parse(body);
                    _token = token;

                    done()
                })
            })
    })

   it("should return all news acording to the user's preferences and country", done => {
        retrieveNews(_token, (error, myNews) => {
            expect(error).to.be.undefined;

            expect(myNews.length).to.be.greaterThan(0);

            for (let i in myNews){
                expect(myNews[i]).to.exist;
                expect(myNews[i]).to.be.an.instanceOf(Object);
            }

            done()
        })

    })

    it("should return an error because the token is invalid", done => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI0MDVmYjg2MmJkNTAwMTU5ODQ0NGMiLCJpYXQiOjE1ODg5NDg3NDgsImV4cCI6MTU4ODk1MjM0OH0'

        retrieveNews(token, (error, myNews) => {
            expect(error).to.exist;
            expect(error.message).to.equal('invalid token');

            expect(myNews).to.be.undefined;

            done()
        })
    })

    it('should return an error when the token is empty or blank', () => {
        let __token = '  '
        expect(function () {
            retrieveNews(__token, function () { })
        }).to.throw(Error, `${__token} is empty or blank`)

        __token = ''
        expect(function () {
            retrieveNews(__token, function () { })
        }).to.throw(Error, `${__token} is empty or blank`)
    })

    it('should return an error when headline is not a function', () => {

        expect(function () {
            retrieveNews(_token, undefined)
        }).to.throw(TypeError, `undefined is not a function`)

        expect(function () {
            retrieveNews(_token, 'my news')
        }).to.throw(TypeError, `my news is not a function`)

        expect(function () {
            retrieveNews(_token, 22)
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
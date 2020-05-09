describe('searchUsers', () => {
    let name,surname,email,password,username, _token

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
        username = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}`
    })

    beforeEach( done => {
        call('POST','https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "nickname": "${username}", "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }, (error, status) => {
            if (error) return done(error)
            if (status != 201) return done(new Error(error.message))

            call('POST',
            'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{
                "username": "${email}",
                "password": "${password}"
            }`,
            { 'Content-type': 'application/json' }, 
            (error, status, body) => {
                if (error) return done(error)
                if (status != 200) return done(new Error(error.message))
                
                const {token} = JSON.parse(body)
                _token = token

                done()
            })
        })
    })


    it('should succeed on searching the user himself', done => {
        let query = email
        searchUsers(_token, query, (error, results) => {
            expect(error).to.be.undefined

            expect(results).to.exist
            expect(results).to.be.an('array')
            expect(results.length).to.be.greaterThan(0)
            expect(results[0].id).to.exist
            expect(results[0].nickname).to.exist
            expect(results[0].email).to.exist
            expect(results[0].following).to.be.undefined

            done()
        })
    })

    it('should succeed on searching existing data', done => {
        let _name = names.random()
        let  _surname = surnames.random()
        let  _email = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        let  _password = passwords.random()
        let _username = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}`


        call('POST','https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "nickname":"${_username}", "username": "${_email}", "password": "${_password}" }`,
        { 'Content-type': 'application/json' }, (error, status) => {
            if (error) return done(error)
            if (status != 201) return done(new Error(error.message))

            call('POST',
            'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{
                "username": "${_email}",
                "password": "${_password}"
            }`,
            { 'Content-type': 'application/json' }, 
            (error, status, body) => {
                if (error) return done(error)
                if (status != 200) return done(new Error(error.message))

                let query = _email

                searchUsers(_token, query, (error, results) => {
                    expect(error).to.be.undefined

                    expect(results).to.exist
                    expect(results).to.be.an('array')
                    expect(results.length).to.be.greaterThan(0)
                    expect(results[0].id).to.exist
                    expect(results[0].nickname).to.exist
                    expect(results[0].email).to.exist
                    expect(results[0].following).to.exist

                    done()
                })
            })
        })

    })
})
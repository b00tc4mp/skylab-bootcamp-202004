describe('retrive-fwitter', () => {
    let _name, surname, email, password, player, message

    beforeEach(() => {
        _name = names.random();
        surname = surnames.random();
        email = `${_name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`;
        password = passwords.random();
        player = playersTop.random()
        message = messages.random()
    })

    describe('Async Test', () => {

        it('Should succeed on correct data', done => {

            call('POST',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name":"${_name}","surname":"${surname}","username":"${email}","password":"${password}", "app":"footify"} `, { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                        (error, status, body) => {
                            if (status !== 200) return done(new Error(`undexpected status ${status}`))
                            const { token } = JSON.parse(body)

                            retriveFwitter(token, (error, results) => {
                                expect(error).to.be.undefined
                                const fwitter = results

                                fwitter.forEach(({ idUser, nameUser, surnameUser, fwitter }) => {
                                    fwitter.forEach(({ id, name, fwitt }) => {
                                        fwitt.forEach(({ message, date, _date }) => {
                                            if (_date&&id) {

                                                expect(idUser).to.be.a('string');
                                                expect(idUser).to.exist
                                                expect(nameUser).to.exist
                                                expect(surnameUser).to.exist

                                                expect(fwitter).to.exist

                                                expect(id).to.be.a('string');
                                                expect(id).to.exist
                                                expect(name).to.be.a('string');
                                                expect(name).to.exist

                                                expect(fwitt).to.exist

                                                expect(message).to.be.a('string');
                                                expect(message).to.exist

                                                expect(_date).to.exist
                                            }
                                        })
                                    })
                                })
                                done()
                            })
                        })
                })
        })

        it('Sloud fail in invalidate token', done => {

            call('POST',
            'https://skylabcoders.herokuapp.com/api/v2/users',
            `{"name":"${_name}","surname":"${surname}","username":"${email}","password":"${password}", "app":"footify"} `, { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (status !== 201) return done(new Error(`undexpected status ${status}`))

                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                    `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                    (error, status, body) => {
                        if (status !== 200) return done(new Error(`undexpected status ${status}`))
                        const { token } = JSON.parse(body)

                        const _token = token.substring(0, 6)
                        retriveFwitter(_token, (error, results) => {
                            expect(error).to.exist
                            expect(error).to.instanceOf(Error);
                            expect(error.message).to.equal('invalid token')
                            expect(results).to.be.undefined
                            done()
                        })    
                 })

             })
         })

        afterEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                (error, status, body) => {

                    if (error) return done(error)
                    if (status !== 200) return done(new Error(`unexpected status ${status}`))

                    const { token } = JSON.parse(body)

                    call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        `{ "password": "${password}" }`, {
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
})
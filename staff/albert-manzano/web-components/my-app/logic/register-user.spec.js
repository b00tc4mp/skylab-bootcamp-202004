describe('registerUser', function () {
    let name, surname, email, password

    beforeEach(function () {
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()
    })

    it('should succeed on correct data', function () {
        registerUser(name, surname, email, password)

        const user = users.find(function (user) { return user.email === email })

        expect(user).to.exist
    })

    describe('when user already exists', function () {
        beforeEach(function () {
            users.push({ name, surname, email, password })
        })

        it('should fail alerting user already exists', function () {
            expect(function () {
                registerUser(name, surname, email, password)
            }).to.throw(Error, 'user already exists')
        })
    })

    it('should fail on non-string field', function () {
        expect(function () {
            registerUser(undefined, surname, email, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser(1, surname, email, password)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            registerUser(true, surname, email, password)
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            registerUser(name, undefined, email, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser(name, 1, email, password)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            registerUser(name, true, email, password)
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            registerUser(name, surname, undefined, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser(name, surname, 1, password)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            registerUser(name, surname, true, password)
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            registerUser(name, surname, email, undefined)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser(name, surname, email, 1)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            registerUser(name, surname, email, true)
        }).to.throw(TypeError, 'true is not a string')
    })

    it('should fail on non-alphabetic field', function () {
        expect(function () {
            registerUser('1', surname, email, password)
        }).to.throw(Error, '1 does not match the format')

        expect(function () {
            registerUser('$', surname, email, password)
        }).to.throw(Error, '$ does not match the format')

        expect(function () {
            registerUser('%', surname, email, password)
        }).to.throw(Error, '% does not match the format')

        expect(function () {
            registerUser(name, '&', email, password)
        }).to.throw(Error, '& does not match the format')

        expect(function () {
            registerUser(name, '(', email, password)
        }).to.throw(Error, '( does not match the format')

        expect(function () {
            registerUser(name, '?', email, password)
        }).to.throw(Error, '? does not match the format')

        expect(function () {
            registerUser(name, surname, '1', password)
        }).to.throw(Error, '1 is not an e-mail')

        expect(function () {
            registerUser(name, surname, '$', password)
        }).to.throw(Error, '$ is not an e-mail')
    })
}) 
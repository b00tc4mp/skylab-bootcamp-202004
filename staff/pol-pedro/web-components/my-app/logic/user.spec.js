describe('userDefine', function() {
    let name, surname, email, password

    beforeEach(function() {
        const users = []

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()
    })

    it('should succeed on correct data', function() {
        userDefine(name, surname, email, password)

        const user = users.find(function(user) { return user.email === email })

        expect(user).to.exist
    })

    describe('when user already exists', function() {
        beforeEach(function() {
            users.push({ name, surname, email, password })
        })

        it('should fail alerting user already exists', function() {
            expect(function() {
                userDefine(name, surname, email, password)
            }).to.throw(Error, 'user already exists')
        })
    })

    it('should fail on non-string field', function() {
        expect(function() {
            userDefine(undefined, surname, email, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function() {
            userDefine(1, surname, email, password)
        }).to.throw(TypeError, '1 is not a string')

        expect(function() {
            userDefine(true, surname, email, password)
        }).to.throw(TypeError, 'true is not a string')

        expect(function() {
            userDefine(name, undefined, email, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function() {
            userDefine(name, 1, email, password)
        }).to.throw(TypeError, '1 is not a string')

        expect(function() {
            userDefine(name, true, email, password)
        }).to.throw(TypeError, 'true is not a string')

        // TODO same for the other fields
    })

    it('should fail on non-alphabetic field', function() {
        expect(function() {
            userDefine('1', surname, email, password)
        }).to.throw(Error, '1 is not alphabetic')

        expect(function() {
            userDefine('$', surname, email, password)
        }).to.throw(Error, '$ is not alphabetic')

        expect(function() {
            userDefine('%', surname, email, password)
        }).to.throw(Error, '% is not alphabetic')

        expect(function() {
            userDefine(name, '&', email, password)
        }).to.throw(Error, '& is not alphabetic')

        expect(function() {
            userDefine(name, '(', email, password)
        }).to.throw(Error, '( is not alphabetic')

        expect(function() {
            userDefine(name, '?', email, password)
        }).to.throw(Error, '? is not alphabetic')

        // TODO same for the other fields
    })


})
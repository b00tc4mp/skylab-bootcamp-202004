describe('registerUser', function () {
    it('should succeed on correct data', function () {
        const name = 'name-1',
            surname = 'surname-1',
            email = 'e@mail-1.com',
            password = 'password-1'

        registerUser(name, surname, email, password)

        const user = users.find(function (user) { return user.email === email })

        expect(user).to.exist
    })

    it('should fail on already existing user', function () {
        const name = 'name-2',
            surname = 'surname-2',
            email = 'e@mail-2.com',
            password = 'password-2'

        users.push({ name, surname, email, password })
        expect(function () {
            registerUser(name, surname, email, password)
        }).to.throw(Error, 'User already exists')
    })

    it('should fail on undefined field', function () {
        const name = 'name-3',
            surname = 'surname-3',
            email = 'e@mail-3.com',
            password = 'password-3'

        expect(function () {
            registerUser(undefined, surname, email, password)
        }).to.throw(TypeError, 'undefined is not a string')
        expect(function () {
            registerUser(name, undefined, email, password)
        }).to.throw(TypeError, 'undefined is not a string')
        expect(function () {
            registerUser(name, surname, undefined, password)
        }).to.throw(TypeError, 'undefined is not a string')
        expect(function () {
            registerUser(name, surname, email, undefined)
        }).to.throw(TypeError, 'undefined is not a string')
    })

})
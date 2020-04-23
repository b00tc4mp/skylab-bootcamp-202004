describe('registerUser', function () {
    let name, surname, email, password

    beforeEach(function(){
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

    it('should fail on already existing user', function () {
        users.push({ name, surname, email, password })
        
        expect(function () {
            registerUser(name, surname, email, password)
        }).to.throw(Error, 'User already exists')
    })

    it('should fail on undefined field', function () {
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
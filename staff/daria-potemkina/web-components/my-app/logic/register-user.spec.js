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

    it('should return an type error', function () {
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

        expect(function () {
            registerUser(true, surname, email, password)
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            registerUser(name, true, email, password)
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            registerUser(name, surname, false, password)
        }).to.throw(TypeError, 'false is not a string')

        expect(function () {
            registerUser(name, surname, email, false)
        }).to.throw(TypeError, 'false is not a string')

        expect(function () {
            registerUser(123, surname, email, password)
        }).to.throw(TypeError, '123 is not a string')

        expect(function () {
            registerUser(name, 5, email, password)
        }).to.throw(TypeError, '5 is not a string')

        expect(function () {
            registerUser(name, surname, 5, password)
        }).to.throw(TypeError, '5 is not a string')

        expect(function () {
            registerUser(name, surname, email, 12345678)
        }).to.throw(TypeError, '12345678 is not a string')

    })

    it('shoul return an error', function(){
        expect(function(){
            registerUser('123', surname, email, password)
        }).to.throw(Error, '123 contains non-alphabetic characters')

        expect(function(){
            registerUser('Juan-David', surname, email, password)
        }).to.throw(Error, 'Juan-David contains non-alphabetic characters')

        expect(function(){
            registerUser('???', surname, email, password)
        }).to.throw(Error, '??? contains non-alphabetic characters')

        expect(function(){
            registerUser(name, 'grillo?', email, password)
        }).to.throw(Error, 'grillo? contains non-alphabetic characters')

        expect(function(){
            registerUser(name, '123', email, password)
        }).to.throw(Error, '123 contains non-alphabetic characters')

        expect(function(){
            registerUser(name, '123', email, password)
        }).to.throw(Error, '123 contains non-alphabetic characters')

        expect(function(){
            registerUser(name, surname, 'pepito', password)
        }).to.throw(Error, 'pepito is not an email')

        expect(function(){
            registerUser(name, surname, 'pepito@mail', password)
        }).to.throw(Error, 'pepito@mail is not an email')

        expect(function(){
            registerUser(name, surname, '123.com', password)
        }).to.throw(Error, '123.com is not an email')

        expect(function(){
            registerUser(name, surname, email, '123')
        }).to.throw(Error, 'password does not have the min length')

    })

})
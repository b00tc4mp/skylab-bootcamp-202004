describe('authenticateUser', function() {
    let name, surname, email, password

    beforeEach(function() {
        users.length = 0;

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({ name, surname, email, password })
    })

    it('should succeed on correct credentials', function(){
        expect(function(){
            authenticateUser(email,password)
        }).not.to.throw()
    })

    it('should fail on no correct credentials', function() {
        const _email = email.substring(0, 3) + '_' + email.substring(3)

        expect(function () {
            authenticateUser(_email, password)
        }).to.throw(Error, 'wrong credentials')

        const _password = password + '1'

        expect(function () {
            authenticateUser(email, _password)
        }).to.throw(Error, 'wrong credentials')
    })
    
    it('should fail on non-string field', function () {
        expect(function () {
            authenticateUser(undefined, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            authenticateUser(1, password)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            authenticateUser(true, password)
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            authenticateUser(email, undefined)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            authenticateUser(email, 1)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            authenticateUser(email, true)
        }).to.throw(TypeError, 'true is not a string')

    })

    it('should throw an error because password is empty', function (){
        expect(function () {
            authenticateUser(email, "")
        }).to.throw(Error, 'password is empty or blank')

        expect(function () {
            authenticateUser(email, " ")
        }).to.throw(Error, 'password is empty or blank')
    })
})
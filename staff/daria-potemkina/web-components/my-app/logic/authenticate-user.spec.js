describe('authenticateUser', function(){
    let name, surname, email, password

    beforeEach(function(){
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({name, surname, email, password})
    })

    it('should match the email and password and not return an error', function(){
        expect(function(){
            authenticateUser(email, password)
        }).not.to.throw()
    })

    it('should return an error with wrong credentials', function(){
        expect(function(){
            authenticateUser(email, '123hola!')
        }).to.throw(Error, 'wrong credentials')

        const _email = email.substring(0,2) + '@mail.com'

        expect(function(){
            authenticateUser(_email, password)
        }).to.throw(Error, 'wrong credentials')
    })
    
    it('should return an type error', function () {
        expect(function () {
            authenticateUser(undefined, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            authenticateUser(email, undefined)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            authenticateUser(1, password)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            authenticateUser(email, 1)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            authenticateUser(true, password)
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            authenticateUser(email, false)
        }).to.throw(TypeError, 'false is not a string')
    })

    it('should return an error', function(){
        expect(function(){
            authenticateUser('123@ma', password)
        }).to.throw(Error, '123@ma is not an email')

        expect(function(){
            authenticateUser(email, '  ')
        }).to.throw(Error, 'password is empty or blank')

        expect(function(){
            authenticateUser(email, '')
        }).to.throw(Error, 'password is empty or blank')
    })
})
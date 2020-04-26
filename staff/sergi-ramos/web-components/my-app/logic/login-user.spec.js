describe('authenticateUser', () => { 
    let name, surname, email, password

    beforeEach( () => { debugger
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({ name, surname, email, password })
    })

    it('should succeed on correct credentials',  () => {

        expect( () => {
            loginUser(email, password)
        }).not.to.throw()
    })

    it('should fail on incorrect credentials', () => {

        const _email = email.substring(0, 3) + '-' + email.substring(3)

        expect( () => {
            loginUser(_email, password)
        }).to.throw(Error, 'wrong credentials')

        const _password = password.substring(0, 3) + '-' + password.substring(3)

        expect( () => {
            loginUser(email, _password)
        }).to.throw(Error, 'wrong credentials')
    })

    it('should fail if arguments are not strings', () => {

        expect( () => {
            loginUser(true, password)
        }).to.throw(Error, 'is not a string')

        expect( () => {
            loginUser(email, 123)
        }).to.throw(TypeError, 'password is not a string')
    })

    it('should fail using a non email string', () => {
        
        expect( () => {
            loginUser('isNotAnEmail', password)
        }).to.throw(Error, 'isNotAnEmail is not an e-mail')
    })

    it('should fail if password string is empty', () => {
        expect( () => {
            loginUser(email, '    ')
        }).to.throw(Error, 'password is empty or blank')

        expect( () => {
            loginUser(email, '')
        }).to.throw(Error, 'password is empty or blank')
    })   
})
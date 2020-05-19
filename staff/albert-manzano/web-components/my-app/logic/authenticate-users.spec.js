describe('authenticateUser', function () {
    let name,surname,email,password
    
    beforeEach(function(){
        users.length=0
       
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({name,surname,email,password})
    })
    
    it('should succeed on correct data', function () {
        expect(function(){
            authenticateUser(email,password)
        }).not.to.throw()
    })

    it('should fail on incorrect credentials',function(){
        expect(function(){
            authenticateUser("andre@gmail.com",password)
        }).to.throw(Error,"wrong credentials")

        expect(function(){
            authenticateUser(email,"sjhflahashflafhlsf")
        }).to.throw(Error,"wrong credentials")
    })

    it('should not accept not proper inputs',function(){
        expect(function () {
            registerUser(undefined, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser( 1, password)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            registerUser( true, password)
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            registerUser( email, undefined)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser( email, 1)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            registerUser( email, true)
        }).to.throw(TypeError, 'true is not a string')
    })
})
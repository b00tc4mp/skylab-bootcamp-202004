describe('authenticateUser', function() {
    const email = 'manuel1barzi@gmail.com'
    const password = '123'
    const users = [{ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123' }, { name: 'Manu', surname: 'Barzi', email: 'manubarzi@gmail.com', password: '123' }]

    // it('should succeed on login with a registered user', function(){
    //     const email = 'manuelbarzi@gmail.com'
    //     const password = '123'
    //     expect(function(){
    //         authenticateUser(email,password)
    //     }).not.to.throw(Error)
    // })
    
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

    it('should succeed on login with a registered user', function(){
        expect(function(){
            authenticateUser(email,password)
        }).to.throw(Error, 'wrong credentials')
    })
})
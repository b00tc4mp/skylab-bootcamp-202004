describe('retrieveUser', function() {
    const email = 'manuel1barzi@gmail.com'
    const users = [{ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123' }, { name: 'Manu', surname: 'Barzi', email: 'manubarzi@gmail.com', password: '123' }]
    
    // it('should return the user', function(){
    //     let result = retrieveUser(email)

    //     expect(result.name).to.equal('Manuel')
    //     expect(result.surname).to.equal('Barzi')
    //     expect(result.email).to.equal('manuelbarzi@gmail.com')
    // })
    
    it('should fail on non-string field', function () {
        expect(function () {
            retrieveUser(undefined)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            retrieveUser(1)
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            retrieveUser(true)
        }).to.throw(TypeError, 'true is not a string')

    })

    it('should fail on a non email string', function() {
        expect(function(){
            retrieveUser('alejandro')
        })
    }).to.throw(Error, 'alejandro is not an e-mail')
})
describe('retrieveUser', function() {
    let name, surname, email, password

    beforeEach(function() {
        users.length = 0;

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({ name, surname, email, password})
    })

    it('should succeed on correct credentials returning only public credentials', function(){       
        const user = retrieveUser(email)
        
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.be.undefined     
    })
    
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
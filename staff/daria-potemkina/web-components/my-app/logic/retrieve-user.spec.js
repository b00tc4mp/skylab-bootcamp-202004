describe('retrieveUser', function(){
    let name, surname, email, password

    beforeEach(function () {
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({name, surname, email, password})
    })

    it('should return user data', function(){
        const user = retrieveUser(email)

        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
    })

    it('should return a type error', function(){
        expect(function(){
            retrieveUser(11)
        }).to.throw(TypeError, '11 is not a string')

        expect(function(){
            retrieveUser(undefined)
        }).to.throw(TypeError, 'undefined is not a string')
    })

    it('should return an error', function(){
        expect(function(){
            retrieveUser('hola')
        }).to.throw(Error, 'hola is not an e-mail')
    })
})
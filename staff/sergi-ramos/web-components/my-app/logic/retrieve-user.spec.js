describe('retrieveUser', () => {

    let name, surname, email, password

    beforeEach( () => {
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({ name, surname, email, password })
    })

    it('should succeed if mail matches',() => {
        
        const user = retrieveUser(email)
       
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
    })

    it('should return undefined if email is not registered', () => {
        const _email = 'e@email.com'

        expect(retrieveUser(_email)).to.be.undefined
    })

    it('should fail if arguments are not strings', () => {
        expect( () => {
            retrieveUser(true, password)
        }).to.throw(Error, 'is not a string')
    })
    
    it('should fail using a non email string', () => {
        expect( () => {
            retrieveUser('isNotAnEmail', password)
        }).to.throw(Error, 'isNotAnEmail is not an e-mail')
    })    
})

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

    it('should succeed if mail matches',() => { debugger
        
        const user = retrieveUser(email)
       
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user._email).to.equal(email)
        
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

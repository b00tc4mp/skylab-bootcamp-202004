describe('searchUser', () => { 
    let name, surname, email, password, usersFound

    beforeEach( () => {
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({ name, surname, email, password })
    })

    it('should fail if is empty or blank', () => {    // do it with throw and try catch!!

        usersFound = searchUser(' ')
        
        expect(usersFound).to.be.an('array')
        expect(usersFound.length).to.equal(0)
    })

    it('should succes if registered user is searched', () => {     // do it with throw and try catch!!

        usersFound = searchUser(name)
        
        expect(usersFound).to.be.an('array')
        expect(usersFound.length).to.equal(1)
        expect(usersFound[0].name).to.equal(name)
        expect(usersFound[0].surname).to.equal(surname)
        expect(usersFound[0].email).to.equal(email)
        expect(usersFound[0].password).to.be.undefined
    })
})
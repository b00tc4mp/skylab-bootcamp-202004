describe('registerUser', function() {
    it('should succeed on correct data', function() {
        const name = 'name-1',
            surname= 'surname-1',
            email = 'e@mail-1.com',
            password = 'password-1'
        
        registerUser(name, surname, email, password)

        const user = users.find(function(user) { return user.email === email })

        expect(user).to.exist
    })

    it('should fail on already existing user', function() {
        const name = 'name-2',
            surname= 'surname-2',
            email = 'e@mail-2.com',
            password = 'password-2'

        users.push({ name, surname, email, password })
    
        expect(function() {
            registerUser(name, surname, email, password)
        }).to.throw(Error, 'user already exists')
    })

    it('should fail on undefined field', function() {
        // TODO invoke registerUser with each field undefined (4 times)
    })
})
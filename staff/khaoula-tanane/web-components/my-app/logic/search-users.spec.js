describe('searchUsers', function () {
    let email, password, name, surname

    beforeEach(function () {
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()
    })

    it('should succeed on correct data', function () {
        registerUser(name, surname, email, password)
        authenticateUser(email, password)
        expect(user).to.exist
        expect(user.name).to.equal(name)

    })
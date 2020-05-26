describe('searchUsers', function () {

    beforeEach(function () {

    })

    it('should succeed on correct data', function () {
        registerUser(name, surname, email, password)
        authenticateUser(email, password)
        expect(user).to.exist
        expect(user.name).to.equal(name)

    })
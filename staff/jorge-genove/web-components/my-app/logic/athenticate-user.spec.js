describe('authenticateUser', function () {
    
    it('should succeed on correct data', function () {
        const _users = [{ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123123123' }]
        debugger
        authenticateUser('manuelbarzi@gmail.com', '123123123')
        const user = _users.find(function (user) {
        return user.email === email && user.password === password})
        expect(user).to.exist
    })

})
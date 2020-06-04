describe("authenticateUser", function() {
    let name, surname, email, password;

    beforeEach(function() {
        users.length = 0;

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({ name, surname, email, password })
    })

    it("should succeed on correct credentials", function() {
        expect (function() {
            authenticateUser(email, password)
       }).not.to.Throw()
    });

    it("should fail on incorrect credentials", function() {
        expect (function() {
            authenticateUser(email, password)
       }).to.Throw()
    });
});
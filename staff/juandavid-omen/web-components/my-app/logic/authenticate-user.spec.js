describe('authenticateUser', function () {
    let name, surname, email, password

    beforeEach(function () {
        users.length = 0

        name = names.random();
        surname = surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`;
        password = passwords.random();

        users.push({ name, surname, email, password });
    })

    it('should succeed on correct credentials', function () {
        expect(function () {
            authenticateUser(email, password);
        }).not.to.throw();
    })

    it('should fail on incorrect credentials', function () {
        const _email = email.substring(0, 2) + '*' + email.substring(2);

        expect(function () {
            authenticateUser(_email, password)
        }).to.throw(Error, 'wrong credentials')

        const _password = password.substring(0, 3) + '-' + password.substring(3);

        expect(function () {
            authenticateUser(email, _password);
        }).to.throw(Error, 'wrong credentials');
    }) 
})
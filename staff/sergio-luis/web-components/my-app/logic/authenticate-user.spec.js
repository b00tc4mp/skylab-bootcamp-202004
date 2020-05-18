describe('Authenticate Users', () => {
    let name, surname, email, password;

    beforeEach(function(){
        users.length = 0;
        name = names.random();
        surname = surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random();

        users.push({name,surname,email,password})
    })
        
    it('should succeed on correct credentials', ()=>{
        expect(()=>{
            authenticateUser(email,password)
        }).not.to.throw()
    })

    it('should fail on incorrect credentials', ()=>{
        const _email = email.substring(0, 3) + '-' + email.substring(3)
        expect(()=>{
            authenticateUser(_email,password)
        }).to.throw(Error, 'wrong credentials')

        const _password = password.substring(0, 3) + '-' + password.substring(3)
        expect(()=>{
            authenticateUser(email,_password)
        }).to.throw(Error, 'wrong credentials')
    })

    it('should fail on incorrect email and incorrect password', ()=>{
        const _email = email.substring(0, 3) + '-' + email.substring(3) + '+'
        expect(()=>{
            authenticateUser(_email,password)
        }).to.throw(Error, `${_email} is not a email`)

        const _password =''
        expect(()=>{
            authenticateUser(email,_password)
        }).to.throw(Error, 'password is empty or blank')
    })
    it('should fail with typeError is not string in email ans password', ()=>{
        const _email = 123
        expect(()=>{
            authenticateUser(_email,password)
        }).to.throw(TypeError, '123 is not a string')

        const _password = 123123
        expect(()=>{
            authenticateUser(email,_password)
        }).to.throw(TypeError, '123 is not a string')
    })
})
describe('registerUser', () => {
    let name, surname, email, password

    beforeEach( () => {
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()
    })

    it('should succeed on correct data', () => {
        registerUser(name, surname, email, password)

        const user = users.find( (user) => { return user.email === email })

        expect(user).to.exist
    })

    describe('when user already exists',  () => {
        beforeEach( () => {
            users.push({ name, surname, email, password })
        })

        it('should fail alerting user already exists',  () => {
            expect( () => {
                registerUser(name, surname, email, password)
            }).to.throw(Error, 'user already exists')
        })
    })

    it('should fail on non-string field', () => {
        expect( () => {
            registerUser(undefined, surname, email, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect( () => {
            registerUser(name, 1, email, password)
        }).to.throw(TypeError, '1 is not a string')

        expect( () => {
            registerUser(true, surname, email, password)
        }).to.throw(TypeError, 'true is not a string')

        expect( () => {
            registerUser(name, surname , undefined, password)
        }).to.throw(TypeError, 'undefined is not a string')

        expect( () => {
            registerUser(name, surname, email, 1)
        }).to.throw(TypeError, '1 is not a string')

        expect( () => {
            registerUser(name, surname, email, true)
        }).to.throw(TypeError, 'true is not a string')

        // TODO same for the other fields
    })

    it('should fail on non-alphabetic field', () => {
        expect( () => {
            registerUser('1', surname, email, password)
        }).to.throw(Error, '1 is not alphabetic')

        expect( () => {
            registerUser(name, '$', email, password)
        }).to.throw(Error, '$ is not alphabetic')

        expect( () => {
            registerUser(name, '%',email , password)
        }).to.throw(Error, '% is not alphabetic')

              expect( () => {
            registerUser('(',surname ,email , password)
        }).to.throw(Error, '( is not alphabetic')

        expect( () => {
            registerUser(name, '?', email, password)
        }).to.throw(Error, '? is not alphabetic')

        // TODO same for the other fields
    })

    it('should fail on non-password correct format', () => {
        

        expect( () => {
            registerUser(name, surname, email , '%')
        }).to.throw(Error, 'password does not have min length')

        expect( () => {
            registerUser(name, surname , email, '&')
        }).to.throw(Error, 'password does not have min length')

      
        // TODO same for the other fields
    })
})
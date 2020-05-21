describe('userDefine', function() {
    let name, surname, email, password, data

    beforeEach(function() {
        const users = []

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()
    })

    it('should fail because we are the only user registerd', function() {
        data = 'Pol'

        expect(function () {
            lookUsers (data, users)
        }).to.throw(Error, 'You are the only user of my app')
    })

   describe('happy path when you are not the only user registerd', function() {
        beforeEach(function() {
            users.push({ name:'Pol', surname: 'pedro', email: 'pol.pedro97@gmil.com', password:'123123123' })
        })
        it('sould succed', function (){
            const user = lookUsers('Pol', users)
            expect(user).to.exist
        })
        
    })

    it('should fail on non-string field', function() {
        expect(function() {
            lookUsers(undefined, users)
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function() {
            lookUsers('', users)
        }).to.throw(TypeError, '')

        expect(function() {
            lookUsers(true, users)
        }).to.throw(TypeError, 'true is not a string')

    })

    it('should display the correct information', function() {
        const users = [{name: 'Pol', surname: 'Pepe', email: 'pol.pedro97@gmail.com', password: '123123123'}, {name: 'Pol', surname: 'yo', email: 'pol.pedro977@gmail.com', password: '123123123'}, {name: 'yo', surname: 'mamen', email: 'poul.pedro97@gmail.com', password: '123123123'}, {name: 'Pol', surname: 'Pepe', email: 'pol.pedro9777@gmail.com', password: '123123123'}]

        it('sould succed and return, name', function (){
            const user = lookUsers('Pol', users)
            expect(user).to.equal(user[users[0], users[1], users[3]])
        })

        it('sould succed and return, email', function (){
            const user = lookUsers('pol.pedro97@gmail.com', users)
            expect(user).to.equal(user[users[0]])
        })

        it('sould succed and return, name and surname', function (){
            const user = lookUsers('Pol ', users)
            expect(user).to.equal('patata')
        })
        
    })


})
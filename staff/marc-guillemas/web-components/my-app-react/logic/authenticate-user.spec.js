import { useCallback } from "react";

describe.only("authenticateUser",function(){
    

    let name,surname,email,password
    
    beforeEach(function(){
       
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

    })

    describe('when user already exists', () => {
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{"name" : "${name}", "surname" : "${surname}", "username" : "${email}", "password" : "${password}"}`,
            {"Content-type" : "application/json"},
            (error,status,body) => {
                if(error) return done(new Error(error))
                if(status !== 201) return done(new Error(`Unexpeted status ${status}`))
            
                done()
            })
        })
    })

    it("should succeed on correct data", () => {
        
        aunthenticateUser(email,password, (error,token) => {
            expect(error).to.be.undefined
            expect(token).to.be.a('string')

            done()
        })
    

    });

    it("should fail on incorrect ", () => {
        
        aunthenticateUser(email,password, (error,token) => {
            expect(error).to.be.undefined
            expect(token).to.be.a('string')

            done()
        })
    

    });

    afterEach()
});
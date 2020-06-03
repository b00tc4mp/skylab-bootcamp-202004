const { expect } = require('chai')
const registerUser = require('./register-user')
global.XMLHttpRequest = require('xhr2')
const { utils: { call } } = require('misc-commons')
const { random } = Math

// TODO do not use call for creating scenarios, but misc-data and direct db CRUD

describe('registerUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        console.log(email)
        console.log(password)
    })

    it('should succeed on correct data', () => {
       return registerUser(name, surname, email, password)
            .then((body)=>{

                expect(body).to.be.undefined

                return call('POST', 'http://localhost:8080/users/auth',
                    `{ "email": "${email}", "password": "${password}" }`,
                     { 'Content-type': 'application/json' })
                    .then(({status,body})=>{
                        expect(status).to.equal(200)
                        const { token } = JSON.parse(body)
                        expect(token).to.exist

                        return  call('GET', 'http://localhost:8080/users/userId',
                                undefined,
                                { Authorization: `Bearer ${token}` })
                            .then(({status,body})=>{
                                expect(status).to.equal(200)

                                const user = JSON.parse(body)

                                expect(user.name).to.equal(name)
                                expect(user.surname).to.equal(surname)
                                expect(user.email).to.equal(email)
                                expect(user.password).to.be.undefined

                            })
                        

                    })
            })      
        
    })

    // describe('when user already exists', () => {
    //     beforeEach(() => {
    //         call('POST', 'http://localhost:8080/users',
    //             `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
    //             { 'Content-type': 'application/json' })
    //             .then(({status,body})=>{
    //                 expect(status).to.equal(201)
    //             })  
    //     })

    //     it('should fail alerting user already exists', () => {
    //         registerUser(name, surname, email, password)
    //             .then(()=>{})
    //             .catch(error=>{
    //                 expect(error).to.exist
    //                 expect(error.message).to.equal(`user with username \"${email}\" already exists`)
    //             })
    //     })
    // })

    // it('should fail on non-string field', () => {
    //     expect(() => {
    //         registerUser(undefined, surname, email, password)
    //     }).to.throw(TypeError, 'undefined is not a string')

    //     expect(() => {
    //         registerUser(1, surname, email, password)
    //     }).to.throw(TypeError, '1 is not a string')

    //     expect(() => {
    //         registerUser(true, surname, email, password)
    //     }).to.throw(TypeError, 'true is not a string')

    //     expect(() => {
    //         registerUser(name, undefined, email, password)
    //     }).to.throw(TypeError, 'undefined is not a string')

    //     expect(() => {
    //         registerUser(name, 1, email, password)
    //     }).to.throw(TypeError, '1 is not a string')

    //     expect(() => {
    //         registerUser(name, true, email, password)
    //     }).to.throw(TypeError, 'true is not a string')

    //     // TODO same for the other fields
    // })



   
    afterEach(() => {
        debugger
        console.log(email)
        console.log(password)
        return call('POST', 'http://localhost:8080/users/auth',
        `{ "email": "${email}", "password": "${password}" }`,
         { 'Content-type': 'application/json' })
            .then(({status,body})=>{
                debugger
                
                console.log(status)
                console.log(body)
                expect(status).to.equal(200)
                const { token } = JSON.parse(body)


                return call('DELETE', 'http://localhost:8080/users/remove',
                `{ "email": "${email}","password": "${password}" }`,
                {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                })
            })
            .then(({status,body})=>{
                expect(status).to.equal(200)

            })
                
    })
})
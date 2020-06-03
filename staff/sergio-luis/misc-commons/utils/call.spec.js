const { expect } = require('chai')
const call = require('./call')
global.XMLHttpRequest = require('xhr2')

describe('call', () => {
    it('should suceed on correct parameters in Google', ()=> {
        call('GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com', undefined, undefined)
            .then(({status,body})=>{
              
                expect(status).to.equal(200)
                expect(body).to.exist
            })
      
    })

    it('should succeed on correct parameteres in User API', () => {
        const username = `pepito-${Math.random()}`

        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users', `{ "username": "${username}", "password": "grillo" }`, { 'Content-type': 'application/json' })
            .then(({status,body})=>{
                expect(status).to.equal(201)
                expect(body).to.equal('')
            })
            .then(()=>{
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{ "username": "${username}", "password": "grillo" }`, { 'Content-type': 'application/json' })
                .then(({status,body})=>{
                    expect(status).to.equal(200)
                    expect(body).to.exist
    
                    const { token } = JSON.parse(body)
                    expect(token).to.be.a('string')


                    return call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { 'Authorization': `Bearer ${token}` })
                        .then(({status,body})=>{
                            expect(status).to.equal(200)
                            expect(body).to.exist

                            return call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users', '{ "password": "grillo" }', { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}`})
                                .then(({status,body})=>{
                                    expect(status).to.equal(204)
                                    expect(body).to.equal('')
                                })

                        })
                }) 
            })
       
    })

    it('should fail on wrong url',() => {
        call('GET', 'https://www.google.com.xy', undefined, undefined)
            .then(()=> {throw new Error ('not expect an error!!')} )
            .catch(error =>{
                expect(error).to.exist
                expect(error.message).to.equal('network error')
            })
    })
})
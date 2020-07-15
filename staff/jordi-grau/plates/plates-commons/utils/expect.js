const { expect } = require('chai')
const call = require('./call')
// require('../polyfills/xhr')
global.fetch = require('node-fetch')


describe('call', () => {
    it('should suceed on correct parameters in Google', async() => {
       const resp =  await call('GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com', undefined, undefined)
        const {status,body} = resp 

    expect(status).to.equal(200)
    expect(body).to.exist   
    })

    it('should succeed on correct parameteres in User API', async() => {
        const username = `pepito-${Math.random()}`

        const resp1 = await call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users', `{ "username": "${username}", "password": "grillo" }`, { 'Content-type': 'application/json' })
        const {status:status1,body:body1}= resp1

            expect(status1).to.equal(201)
            expect(body1).to.equal('')

        const resp2   = await call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{ "username": "${username}", "password": "grillo" }`, { 'Content-type': 'application/json' })
        const {status:status2,body:body2}= resp2

                expect(status2).to.equal(200)
                expect(body2).to.exist

                const { token } = JSON.parse(body2)
                expect(token).to.be.a('string')

        const resp3 = await call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { 'Authorization': `Bearer ${token}` })
        const {status:status3,body:body3}= resp3

                    //console.log(status, body)
                    expect(status3).to.equal(200)
                    expect(body3).to.exist

        const resp4 = await call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users', '{ "password": "grillo" }', { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
        const {status:status4,body:body4}= resp4

                expect(status4).to.equal(204)
                expect(body4).to.equal('') 
    })

    it('should fail on wrong url', async() => {
        try{
            await call('GET', 'https://www.google.com.xy', undefined, undefined)
        }catch(error){
             
            expect(error).to.exist
            expect(error.message).to.equal('network error')
        }
    })
})
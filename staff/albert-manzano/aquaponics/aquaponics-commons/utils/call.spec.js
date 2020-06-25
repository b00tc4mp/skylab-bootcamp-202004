const call = require('./call')
global.fetch = require('node-fetch')
const { expect } = require('chai')

describe('call', () => {
    it('shoul suceed on correct parameters in Google', () => {
        call('GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com', undefined, undefined)
            .then(response => {
                if (response.error) return new Error(error);

                expect(response.status).to.equal(200);
                expect(response.body).to.exist;

            })
    })

    it('should suceed on correct parameters in User API', () => {
        const username = `pepito-${Math.random()}`;
        const password = 'grillo'

        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users', `{"username":"${username}","password":"${password}"}`, { "Content-type": "application/json" })
            .then(response => {
                if (response.error) return new Error(error);

                expect(res.status).to.equal(201);
                expect(response.body).to.equal('');

                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username":"${username}","password":"${password}"}`, { "Content-type": "application/json" })
                    .then(response => {
                        if (response.error) return new Error(error);

                        expect(response.status).to.equal(200);
                        expect(response.body).to.exist;

                        const { token } = JSON.parse(response.body);

                        expect(token).to.be.a('string');

                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { "Authorization": `Bearer ${token}` })
                            .then(response => {
                                if (response.error) return new Error(error);

                                expect(response.status).to.equal(200);
                                expect(response.body).to.exist;

                                call('DELETE', 'https://skylabcoders.herokuapp.com/app/v2/users', `{"password":"${password}"}`, { "Authorization": `Bearer ${token}` })
                                    .then(response => {
                                        if (response.error) return new Error(error);

                                        expect(response.status).to.equal(204);
                                        expect(response.body).to.equal('')

                                    })
                            })
                    })
            })
    })

    it('should fail on wrong url', () => {
        call('GET', 'https://www.google.com.xy', undefined, undefined)
            .then(({error})=>{
            expect(error).to.exist;
            expect(error.message).to.equal('network error');
        })
    })
})
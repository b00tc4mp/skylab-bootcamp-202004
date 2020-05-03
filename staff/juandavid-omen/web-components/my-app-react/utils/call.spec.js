describe('call', () => {
    it('should suceed on correct parameters in Google', done => {
        call('GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com', undefined, undefined, (error, status, body) => {
            if (error) return done(new Error(error))

            //console.log(status, body)
            expect(status).to.equal(200)
            expect(body).to.exist

            done()
        })
    })

    it('should succeed on correct parameteres in User API', done => {
        const username = `pepito-${Math.random()}`

        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users', `{ "username": "${username}", "password": "grillo" }`, { 'Content-type': 'application/json' }, (error, status, body) => {
            if (error) return done(new Error(error))

            //console.log(status, body)
            expect(status).to.equal(201)
            expect(body).to.equal('')

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{ "username": "${username}", "password": "grillo" }`, { 'Content-type': 'application/json' }, (error, status, body) => {
                if (error) return done(new Error(error))

                //console.log(status, body)
                expect(status).to.equal(200)
                expect(body).to.exist

                const { token } = JSON.parse(body)
                expect(token).to.be.a('string')

                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { 'Authorization': `Bearer ${token}` }, (error, status, body) => {
                    if (error) return done(new Error(error))

                    //console.log(status, body)
                    expect(status).to.equal(200)
                    expect(body).to.exist

                    call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users', '{ "password": "grillo" }', { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }, (error, status, body) => {
                        if (error) return done(new Error(error))

                        //console.log(status, body)
                        expect(status).to.equal(204)
                        expect(body).to.equal('')

                        done()
                    })
                })
            })
        })
    })

    it('should fail on wrong url', done => {
        call('GET', 'https://www.google.com.xy', undefined, undefined, (error, status, body) => {
            expect(error).to.exist
            expect(error.message).to.equal('network error')

            done()
        })
    })
})


/*Chuleta de status
200-> todo ok
201-> Created
204-> Actualizado o borrado (No content)

*/
const { random } = Math;
false && describe("call", () => {
    let name, surname, username, password;
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
    })

    it('should connect succesfully to the Users API', done => {
        //Esto es para meter al usuario en la base de datos o así
        call("POST", "https://skylabcoders.herokuapp.com/api/v2/users", `{ "username": "${username}","password": "${password}" }`, { "Content-type": "application/json" }, (error, status, body) => {
            //Comprueba si ha habido error    
            if (error) return done(error);

            //Comprueba que ha salido bien
            expect(status).to.equal(201);
            expect(body).to.equal("");

            //Ahora hay que comprobar que de verdad se ha guardado bien
            call("POST", "https://skylabcoders.herokuapp.com/api/v2/users/auth", `{ "username": "${username}","password": "${password}" }`, { "Content-type": "application/json" }, (error, status, body) => {
                //Comprueba el error    
                if (error) return done(error);
                //Comprueba que ha salido bien
                expect(status).to.equal(200);
                expect(body).to.exist;
                //Ahora saca el token de esta llamada para poder hacer comprobaciones y eliminar la prueba
                //transforma el body en un objeto y le saca la propiedad token
                const token = JSON.parse(body).token;
                expect(typeof token).to.equal("string");

                call('GET', "https://skylabcoders.herokuapp.com/api/v2/users", undefined, { "Authorization": `Bearer ${token}` }, (error, status, body) => {
                    if (error) return done(error)

                    expect(status).to.equal(200)
                    expect(body).to.exist

                    //Elimina el usuario que hemos creado para la prueba
                    call("DELETE", "https://skylabcoders.herokuapp.com/api/v2/users", `{ "password": "${password}"}`, { "Content-type": "application/json", "Authorization": `Bearer ${token}` }, (error, status, body) => {
                        //Comprueba que ha salido bien
                        if (error) return done(error)
                        expect(status).to.equal(204);
                        expect(body).to.equal("");

                        //Llama al done cuando ha terminado todo
                        done();

                    })
                })
            })
        })
    })

    it("should succesfully connect with google", done => {
        call('GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com', undefined, undefined, (error, status, body) => {
            if (error) return done(error);
            expect(status).to.equal(200);
            expect(body).to.exist;
            done();
        })
    })

    false && it("should return an error if trying to connect to the Users API with incorrect parameter", done => {
        expect(call("POST", "https://skylabcoders.heokuapp.com/api/v2/users/auth", `{ "username": "${username}","password": "${password}" }`, { "Content-type": "application/json" }, (error, status, body) => {
            expect(error).to.exist;
            done();
        }))
    })

    it('should fail when the URL is wrong', done => {
        call('GET', 'https://eriutnirtjn.txcx', undefined, undefined, error => {
            expect(error).to.exist;
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.equal('Network error');

            done();
        });
    })
})
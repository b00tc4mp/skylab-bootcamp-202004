describe(("toggleFollow"), () => {
    let name1, surname1, email1, password1, name2, surname2, email2, password2;


    beforeEach(() => { 
        name1 = names.random()
        name2 = names.random()
        surname1 = surnames.random()
        surname2 = surnames.random()
        email1 = `${name1.toLowerCase().split(" ").join("")}${surname1.toLowerCase()
            .split(" ").join("").concat("-").concat(Math.random())}@mail.com`;
        email2 = `${name2.toLowerCase().split(" ").join("")}${surname2.toLowerCase()
            .split(" ").join("").concat("-").concat(Math.random())}@mail.com`;
        password1 = passwords.random()
        password2 = passwords.random()
    })
    it.only("should follow and unfollow a user", (done) => {

        call('POST', "https://skylabcoders.herokuapp.com/api/v2/users/",
            `{"name": "${name1}" , "surname": "${surname1}", "username" : "${email1}","password": "${password1}"}`,
            
            { "Content-type": "application/json" }, (error, status, body) => {
                expect(error).to.be.undefined
                if (status === 201) {
                    call('POST', "https://skylabcoders.herokuapp.com/api/v2/users/",
                        `{"name": "${name2}" , "surname": "${surname2}", "username" : "${email2}","password": "${password2}"}`,
                        { "Content-type": "application/json" }, (error, status, body) => {
                            expect(error).to.be.undefined
                            if (status === 201) {
                                call('POST', "https://skylabcoders.herokuapp.com/api/v2/users/auth",
                                    `{"username" : "${email1}","password": "${password1}"}`,
                                    { "Content-type": "application/json" }, (error, status, body) => {
                                        expect(error).to.be.undefined

                                        if (status === 200) {
                                            const { token } = JSON.parse(body)


                                            call('GET', "https://skylabcoders.herokuapp.com/api/v2/users/",
                                                undefined, { Authorization: `Bearer ${token}` }, (error, status, body) => {
                                                    if (error) return done(error)
                                                    if (status === 200) {
                                                        const { following } = JSON.parse(body)
                                                        expect(following).to.be.undefined

                                                        toogleFollow(token, email2, (error) => {
                                                            if (error) return done(error)
                                                            //La chicha
                                                            //Comprobamos que user1.following.length existe y es 1
                                                            call('GET', "https://skylabcoders.herokuapp.com/api/v2/users/",
                                                                undefined, { Authorization: `Bearer ${token}` }, (error, status, body) => {
                                                                    if (error) return done(error)
                                                                    if (status === 200) {
                                                                        const { following } = JSON.parse(body)
                                                                        expect(following.length).to.be.equal(1)
                                                                        //Le damos a desseguir
                                                                        toogleFollow(token, email2, (error) => {
                                                                            //Comprobamos que user1.following.length es 0

                                                                            call('GET', "https://skylabcoders.herokuapp.com/api/v2/users/",
                                                                                undefined, { Authorization: `Bearer ${token}` }, (error, status, body) => {
                                                                                    if (error) return done(error)
                                                                                    if (status === 200) {
                                                                                        const { following } = JSON.parse(body)
                                                                                        expect(following.length).to.be.equal(0)
                                                                                        //Borrar a los 2 usuarios
                                                                                        done()
                                                                                    }
                                                                                }
                                                                            )
                                                                        })
                                                                    }
                                                                }
                                                            )
                                                        })
                                                    }
                                                }
                                            )
                                        }
                                        else {
                                            const { error } = JSON.parse(body)
                                            done(new Error(error))
                                        }
                                    })
                            } else {
                                const { error } = JSON.parse(body)
                                done(new Error(error))
                            }
                        }
                    )
                } else {
                    const { error } = JSON.parse(body)
                    done(new Error(error))
                }
            }
        )
        //Call con el register(name1,surname1) x
        //Meter a dos usuarios x

        //Que usuario 1 siga a 2

        //Comprobar que user1.following incluye a user 2
        //Comprobar que user2.following no se ha visto afectado

        //Que usuario 1 deje de seguir a usuario 2

        //Comprobar que user1.following no incluye a user 2
        //Comprobar que user2.following no se ha visto afectado

        //Eliminar a los usuarios 1 y 2 de la base de datos



    }).timeout(10000)
    afterEach(done => {
        //Buscar si hay user con username===email1 y si existe lo borra
        //Luego lo mismo con email2
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            undefined, `{"username" : "${email1}","password": "${password1}"}`,
            (error, status, body) => {

                const token1 = JSON.parse(body).token

                call("DELETE", "https://skylabcoders.herokuapp.com/api/v2/users",
                    `{ "password": "${password1}"}`,
                    { "Content-type": "application/json", "Authorization": `Bearer ${token1}` },
                    (error, status, body) => {

                        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                            undefined, `{"username" : "${email2}","password": "${password2}"}`,
                            (error, status, body) => {
                                
                                const token2 = JSON.parse(body).token

                                call("DELETE", "https://skylabcoders.herokuapp.com/api/v2/users",
                                    `{"password": "${password2}"}`,
                                    { "Content-type": "application/json", "Authorization": `Bearer ${token2}` },
                                    (error, status, body) => {
                                        done();
                                    })
                            })
                    })
            })
        //Errores de tipo: si (user,emailFollowing, token, callback) no son del tipo adecuado

        //Error de que se le pasan parametros del tipo adecuado pero con valores invalidos

        //Error de que los usuarios que se le pasan no existen

    })
})
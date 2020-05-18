describe(("toggleFollowUser"), () => {
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
    it("should follow and unfollow a user", (done) => {

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

                                                        toggleFollowUser(email2, token, (error) => {
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
                                                                        toggleFollowUser(email2, token, (error) => {
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
    }).timeout(10000)
    // it("should throw an error if noseque")
    afterEach(done => {
       
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
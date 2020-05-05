describe.only('toggleFollowUser', () => {

    let name, surname, password, email, followingId,following
    let _name, _surname, _password, _email

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()

        _name = names.random()
        _surname = surnames.random()
        _email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        _password = passwords.random()
    })

    describe('should succed on adding follower', () => {
        beforeEach(done => {

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name":"${name}","surname":"${surname}","username":"${email}","password":"${password}"}`,
                { "Content-type": 'application/json' }, (error, status, body) => {
                    if (error) return done(new Error(error.message))

                    if (status === 201) {

                        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                            `{"username":"${email}","password":"${password}"}`,
                            { "Content-type": 'application/json' }, (error, status, body) => {
                                if (error) return done(new Error(error.message))

                                if (status === 200) {
                                    let { token } = JSON.parse(body);

                                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                                        undefined,
                                        { 'Authorization': `Bearer ${token}` },
                                        (error, status, body) => {
                                            if (error) return done(error)
                                            if (status === 200) {

                                                let users = JSON.parse(body)

                                                let { id } = users.find(({ username }) => {
                                                    return (username === email)
                                                })
                                                followingId=id

                                                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                                                    `{"name":"${_name}","surname":"${_surname}","username":"${_email}","password":"${_password}"}`,
                                                    { "Content-type": 'application/json' }, (error, status) => {
                                                        if (error) return done(new Error(error.message))

                                                        if (status === 201) {

                                                            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                                                                `{"username":"${_email}","password":"${_password}"}`,
                                                                { "Content-type": 'application/json' }, (error, status, body) => {
                                                                    if (error) return done(new Error(error.message))
                                                                    //falta
                                                                    if (status === 200) {

                                                                        let {token} = JSON.parse(body);
                                                                        const _token=token
                                                                        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                                                                            undefined,
                                                                            { 'Authorization': `Bearer ${token}` }, (error, status, body) => {
                                                                                if (error) return done(new Error(error.message))
                                                                                if (status === 200) {

                                                                                    let { _following } = JSON.parse(body)
                                                                                    following = _following
                                                                                    done()
                                                                                }
                                                                            })
                                                                    }
                                                                })
                                                        }
                                                    }
                                                )
                                            }
                                        })
                                }
                            })
                    }
                })
        })
        it('should succed on adding following', done => {
            toggleFollowUser(token, id, (error, toggle) => {
                if (error) return done(new Error(error.message))
                else {
                    expect(error).to.be.undefined
                    expect(token).to.exist
                    expect(_token).to.exist
                    expect(id).to.exist
                    expect(token).to.be.an(String)
                    expect(_token).to.be.an(String)
                    expect(id).to.be.an(String)
                    expect(toggle).to.exist
                    expect(toggle).to.be.a(Function)
                    expect(following).to.exist
                    expect(following).to.be(String)
                    expect(following).to.equal(followingId)

                    done()
                }
            })
        })
    


    })



})


            // Todo 2 users
            // registerUser(em.... etc)
            //     Authenticator( para sacar token)
            //     no salta error
            //     creat new following
            //         registerUser(followin)

            //         toggleFollowUser(token,id,call)
            // 1 registrar y auth
            // registrar y pasar el id al primero 



//             it('should succeed on existing users', () => {
//                 toggleFollowUser(email, following)

//                 const user = users.find(user => user.email === email)

//                 expect(user).to.exist
//             })

//             describe('when following is already followed', () => {
//                 beforeEach(() => {
//                     const user = users.find(user => user.email === email)

//                     user.following = [following]
//                 })

//                 it('should succeed and following become unfollowed', () => {
//                     toggleFollowUser(email, following)

//                     const user = users.find(user => user.email === email)

//                     expect(user).to.exist
//                     expect(user.name).to.equal(name)
//                     expect(user.surname).to.equal(surname)
//                     expect(user.email).to.equal(email)
//                     expect(user.password).to.equal(password)

//                     expect(user.following).to.exist
//                     expect(user.following).to.have.length(0)
//                 })
//             })
//         })

//         describe('when following does not exist', () => {
//             beforeEach(() => following = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`)

//             it('should fail alerting following user e-mail does not exist', () =>
//                 expect(() => toggleFollowUser(email, following)).to.throw(Error, `user with e-mail ${following} not found`)
//             )
//         })
//     })

//     describe('when user does not exist', () => {
//         beforeEach(() => {
//             email = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`

//             following = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`
//         })

//         it('should fail alerting user e-mail does not exist', () =>
//             expect(() => toggleFollowUser(email, following)).to.throw(Error, `user with e-mail ${email} not found`)
//         )
//     })
// })

            // Todo 2 users
            // 1 registrar y auth

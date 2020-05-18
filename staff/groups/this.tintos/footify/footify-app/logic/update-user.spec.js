describe('updateUser', () => {
    // function profileChange(token, name, surname, email, password, oldPassword, interests, country,callback)
    let name,surname,email,password, _token
    beforeEach(() => {
        name=names.random();
        surname=surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = `password-${Math.random()}`
  
    })

    describe('it should succed on changing parameters',()=>{
        
        //Udpate user

       it('should succed on correct data',done=>{
            call('POST','https://skylabcoders.herokuapp.com/api/v2/users',
            `{"name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}"}`,
            { 'Content-type': 'application/json' },
            (error, status) =>{
                if(error) return done(new Error(error.message));
                if(status != 201) return done(new Error(`undexpected status ${status}`));
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username" : "${email}", "password" : "${password}"}`,
                 { 'Content-type': 'application/json' }, (error, status, body) => {
                        if (error) return done(new Error(error.message));
                        if (status !== 200) return done(new Error(`undexpected status ${status}`));
                        let { token } = JSON.parse(body);
                         token;

                        done();

                });

            });


        it ('should change name/surname', done =>{ 
            newName=names.random();
            newSurname=surnames.random();
            updateUser(token,newName,newSurname,()=>{
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                undefined,
                { 'Authorization': `Bearer ${token}` },
                (error, status, body) => {
                    if (error) return callback(error)

                    if (status === 200) {
                        const { name, surname} = JSON.parse(body)
                        expect(name).to.be(newName)
                        expect(surname).to.be(newSurname)
                        callback()
                    } else {
                        const { error } = JSON.parse(body)

                        callback(new Error(error))

                    } 
                    done();
                })
            })

        })
        })

        afterEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                (error, status, body) => {

                    if (error) return done(error)
                    if (status !== 200) return done(new Error(`unexpected status ${status}`))

                    const { token } = JSON.parse(body)

                    call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        `{ "password": "${password}" }`, {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        (error, status, body) => {
                            if (error) return done(new Error(error.message))
                            if (status !== 204) return done(new Error(`undexpected status ${status}`))

                            done()
                        })
                })
        })

    })
}) 
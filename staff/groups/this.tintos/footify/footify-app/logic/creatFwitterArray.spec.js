describe('Create Array Fwitts', () => {
    let _name, surname, email, password

    beforeEach(() => {
        _name = names.random();
        surname = surnames.random();
        email = `${_name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`;
        password = passwords.random();
    })

    describe('Async Test', () => {

        it('Should succeed on correct data', done => {

            call('POST',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name":"${_name}","surname":"${surname}","username":"${email}","password":"${password}", "app":"footify"} `, { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                        (error, status, body) => {
                            if (status !== 200) return done(new Error(`undexpected status ${status}`))
                            const { token } = JSON.parse(body)

                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                            undefined, { Authorization: `Bearer ${token}` },
                            (error, status, body) => {
                             if (status !== 200) return done(new Error(`undexpected status ${status}`))
                                    let users = JSON.parse(body)
          
                                    const results =[]
                                    users.forEach(({id:idUser,name: nameUser,surname: surnameUser,fwitter})=>{
                    
                                        if(fwitter){
                                            results.push({ idUser,nameUser,surnameUser,fwitter})
                                        } 
                                    })
                                    let counter=0
                                    const fwitterArray = creatFwitterArray(results);
                                    expect(fwitterArray).to.exist
                                    fwitterArray.forEach(({ idUser,nameUser,surnameUser,name,message,date})=>{
                                        counter ++
                                        expect(idUser).to.exist
                                        expect(nameUser).to.exist
                                        expect(surnameUser).to.exist
                                        expect(name).to.exist
                                        expect(message).to.exist
                                        expect(date).to.exist
                                        if(fwitterArray.length === counter) done()
                                    })
 
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

    it('Sould fail if you use a empty array',()=>{
        expect(()=>{
            const array =[]
            creatFwitterArray(array);
        }).to.throw(Error,'The array is empty.')
    })
})
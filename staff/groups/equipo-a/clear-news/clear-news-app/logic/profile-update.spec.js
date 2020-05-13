describe('profileChange', () => {
    // function profileChange(token, name, surname, email, password, oldPassword, interests, country,callback)
    let _name,_surname,_email,_password,_categories,_country
    beforeEach(() => {
        _name=names.random();
        _surname=surnames.random();
        _email = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        _password = password.random();
        _categories = {
            business: true,
            entertainment: true,
            general: false,
            health: false,
            science: true,
            sports: false,
            technology: true
        }
        _country = countries.random();
    })

    describe('it should succed on changing parameters',()=>{
        //post user
       it('should succed on correct data',done=>{
            call('POST','https://skylabcoders.herokuapp.com/api/v2/users',
            `{"name": "${_name}", "surname": "${_surname}", "username": "${_email}", "password": "${_password}", "categories": ${JSON.stringify(_categories)}, "country": "${_country}"}`,
            { 'Content-type': 'application/json' },
            (error, status) =>{
                if(error) return done(new Error(error.message));
                if(status != 200) return done(new Error(`undexpected status ${status}`));
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username" : "${email}", "password" : "${password}"}`, { 'Content-type': 'application/json' }, (error, status, body) => {
                        if (error) return done(new Error(error.message));
                        if (status !== 200) return done(new Error(`undexpected status ${status}`));
                        let { token } = JSON.parse(body);
                        _token = token;

                        done();

                });

            });

            
        it ('should change name/surname', done =>{
            newName=names.random();
            newSurname=surnames.random();
            profileChange(_token,newName,newSurname,null,null,null,null,null,()=>{
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
                       
                    } done();
                })
            })
            
        })
        });
        //post para token


        //test 

    })
})
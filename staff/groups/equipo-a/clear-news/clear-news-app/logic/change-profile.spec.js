describe.only('profileUpdate', () => {

    let _name, _surname, _email, _password, _categories, _country

    beforeEach(() => {
        _name = names.random();
        _surname = surnames.random();
        _email = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        _password = "123123123";
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
    });

    describe('should succed changing paramaters', () => {

        let name1 = "pepito"
        let surname1 = "grillo"
        let email = `${name.toLowerCase().split(' ').join('')}${surname1.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        categories1 = {
            business: true,
            entertainment: true,
            general: false,
            health: false,
            science: true,
            sports: false,
            technology: true
        }
        country1 = "ph";
        password = "holamundo"
        oldPassword = "123123123"
        let _token

        let updateUser = { name1, surname1, email, password, oldPassword, categories1, country1 }

        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name": "${_name}", "surname": "${_surname}", "username": "${_email}", "password": "${_password}", "categories": ${JSON.stringify(_categories)}, "country": "${_country}"}`,
                { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))
                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username" : "${_email}", "password" : "${_password}"}`, { 'Content-type': 'application/json' }, (error, status, body) => {
                        if (error) return done(new Error(error.message))
                        if (status !== 200) return done(new Error(`undexpected status ${status}`))
                        let { token } = JSON.parse(body)
                        _token = token

                        done()
                    });
                });
        });

        it('should change name/surname/categories/country', done => {
            changeProfilege(_token, updateUser, (error) => {
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    undefined,
                    { 'Authorization': `Bearer ${_token}` },
                    (error, status, body) => {
                        if (error) return done(error)

                        if (status === 200) {
                            const {name, surname, username,  categories, country } = JSON.parse(body)
                           
                            expect(name).to.be.Equal(name1)
                            expect(surname).to.be.Equal(surname1)
                            expect(username).to.be.Equal(email1)
                            expect(categories).to.deep.Equal(categories1)
                            expect(country).to.be.Equal(country1)
                            expect(_name).to.not.Equal(name)
                            expect(_surname).to.not.Equal(surname)
                            expect(_username).to.not.Equal(email)
                            expect(_categories).to.not.Equal(categories)
                            expect(_country).to.not.Equal(country)
                        } else {
                            const { error } = JSON.parse(body)

                            done(new Error(error))

                        };

                        done()
                    })
            })
        });
    })
})

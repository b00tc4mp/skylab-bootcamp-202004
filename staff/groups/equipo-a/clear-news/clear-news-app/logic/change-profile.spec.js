describe.only('changeProfile', () => {

    let _name, _surname, _email, _password, _categories, _country

    before(() => {
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
      
        const name1 = "pepito"
        const surname1 = "grillo"
        const email1 = `${name1.toLowerCase().split(' ').join('')}${surname1.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        const categories1 = {
            business: true,
            entertainment: true,
            general: false,
            health: false,
            science: true,
            sports: false,
            technology: true
        }
        const country1 = "ph";
        const password = "holamundo"
        const oldPassword = "123123123"
        let _token

        let updateUser = { name: name1, surname: surname1, email: email1, password, oldPassword, categories: categories1, country: country1 }

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
                        const { token } = JSON.parse(body)
                        _token = token

                        done()
                    });
                });
        });

        it('should change name/surname/categories/country/email', done => {
            changeProfile(_token, updateUser, (error) => {
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    undefined,
                    { 'Authorization': `Bearer ${_token}` },
                    (error, status, body) => {
                        if (error) return done(error)

                        if (status === 200) {
                            const user = JSON.parse(body)

                            expect(user.name).to.equal(name1);
                            expect(user.surname).to.equal(surname1);
                            expect(user.username).to.equal(email1);
                            expect(user.categories).to.deep.equal(categories1);
                            expect(user.country).to.equal(country1);
                            expect(_name).to.not.equal(name);
                            expect(_email).to.not.equal(email1);
                            expect(_categories).to.not.equal(categories1);
                            expect(_country).to.not.equal(country1);
                        } else {
                            const { error } = JSON.parse(body);

                            done(new Error(error))
                        };

                        done()
                    });
            });
        });

        it('should change name/surname/categories/country under same email, not craeting conflict 409 error ', done => {
            updateUser = { name: name1, surname: surname1, email: _email, password, oldPassword, categories: categories1, country: country1 }
            changeProfile(_token, updateUser, (error) => {
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    undefined,
                    { 'Authorization': `Bearer ${_token}` },
                    (error, status, body) => {
                        if (error) return done(error)

                        if (status === 200) {
                            const user = JSON.parse(body)

                            expect(user.name).to.equal(name1);
                            expect(user.surname).to.equal(surname1);
                            expect(user.username).to.equal(_email);
                            expect(user.categories).to.deep.equal(categories1);
                            expect(user.country).to.equal(country1);
                            expect(_name).to.not.equal(name);
                            expect(_email).to.not.equal(email1);
                            expect(_categories).to.not.equal(categories1);
                            expect(_country).to.not.equal(country1);
                        } else {
                            const { error } = JSON.parse(body);

                            done(new Error(error))

                        };

                        done()
                    });
            });
        });
    });

    describe('should fail on incorrect input', () => {
           it('should fail on non-string field', () => {
            let password=""
            let oldPassword=""
            let _token=""
            expect(() => {
                changeProfile(_token,{name:undefined, surname:_surname, email:_email, password,oldPassword,  categories:_categories, country:_country}, function () { })
            }).to.throw(TypeError, 'undefined is not a string');
    
            expect(() => {
                changeProfile(_token,{name:1, surname:_surname, email:_email, password,oldPassword, categories:_categories, country:_country}, function () { })
            }).to.throw(TypeError, '1 is not a string');
    
            expect(() => {
                changeProfile(_token,{name:true, surname:_surname, email:_email, password, oldPassword,  categories:_categories,country:_country}, function () { })
            }).to.throw(TypeError, 'true is not a string');
    
            expect(() => {
                changeProfile(_token,{name:_name, surname:undefined, email:_email, password, oldPassword, categories:_categories, country:_country}, function () { })
            }).to.throw(TypeError, 'undefined is not a string');
    
            expect(() => {
                changeProfile(_token,{name:_name, surname:1, email:_email, password, oldPassword, categories:_categories, country:_country}, function () { })
            }).to.throw(TypeError, '1 is not a string');
    
            expect(() => {
                changeProfile(_token,{name:_name, surname:true, email:_email, password,oldPassword, categories:_categories, country:_country}, function () { })
            }).to.throw(TypeError, 'true is not a string');
    
            expect(() => {
                changeProfile(_token,{name:_name, surname:_surname, email:1, password, oldPassword, categories:_categories, country:_country}, function () { })
            }).to.throw(Error, '1 is not an e-mail');
    
            expect(() => {
                changeProfile(_token,{name:_name, surname:_surname, email:true, password, oldPassword, categories:_categories, country:_country}, function () { })
            }).to.throw(Error, 'true is not an e-mail');
    
            expect(() => {
                changeProfile(_token,{name:_name, surname:_surname, email:undefined,password ,oldPassword,  categories:_categories, country:_country}, function () { })
            }).to.throw(Error, 'undefined is not an e-mail');
            })
    })
})


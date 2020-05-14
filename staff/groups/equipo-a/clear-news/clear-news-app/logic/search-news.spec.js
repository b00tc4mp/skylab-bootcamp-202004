describe('search-news', () => {
    let name,surname,email,password,favorite,query,sortBy,language,counter,_token;

    beforeEach(()=>{
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
        favorite=["Economista: denuncia de EEUU contra criptomoneda de Telegram busca asegurar hegemonía de Washington"];
        query = "ps5";
        sortBy= undefined;
        language="en";
        counter;
        _token;

         })

    describe("create and validate token", () => {
        beforeEach(done => {
            
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{  "username": "${email}", "password": "${password}", "favorite": "${favorite}"}`,
            { 'Content-type': 'application/json' },
            (error, status) => {
                if (error) return done(new Error(error.message))
                if (status !== 201) return done(new Error(`undexpected status ${status}`))
    
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                    `{ "username": "${email}", "password": "${password}" }`,
                    { 'Content-type': 'application/json' },
                    (error, status, body) => {
                        if (error) return done(new Error(error.message));
                        if (status !== 200) return done(new Error(`undexpected status ${status}`));
    
                        const { token } = JSON.parse(body);
                        _token = token
                        
                        
                        done()
                    })
                })

        })

        it('should succeed on language', done => {
            
             searchNews(_token, query, language, sortBy, (error,articles,pages) => {
            
                expect(articles).to.exist;
                expect(articles).to.be.an("array");
                expect(pages).to.exist;
                expect(pages).to.be.an("array");
                expect(query).to.exist;
                expect(query).to.be.an("string");
                expect(language).to.exist;
                expect(language).to.be.an("string");
                expect(sortBy).to.exist;
                expect(sortBy).to.be.an("string");
                done();
            })
    })

    })



})
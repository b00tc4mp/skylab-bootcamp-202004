false && describe("registerUser",()=>{
    //Le da valores al azar a los nombres
    let name, surname, email, password;
    beforeEach(() =>{
        users.length=0;
        name=names.random();
        surname=surnames.random();
        email= `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`;
        password=passwords.random();
    })
    
    it("should register a new user if there are no anomalies", done =>{
        //Lo registra
        registerUser(name,surname,email,password,(error)=>{
            expect(error).to.be.undefined;
            //Comprobar que se ha registrado bien
            //Primero coge el token
            call("POST","https://skylabcoders.herokuapp.com/api/v2/users/auth",
            `{ "username": "${email}","password": "${password}" }`, {"Content-type": "application/json"},(error,status,body)=>{
                expect(error).to.be.undefined;
                expect(status).to.equal(200);
                expect(body).to.exist;
                const token=JSON.parse(body).token;
                //Ahora usa el token para acceder a sus datos
                call("GET", 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, 
                {'Authorization': `Bearer ${token}`},(error,status,body)=>{
                    expect(error).to.be.undefined;
                    expect(status).to.equal(200);
                    expect(body).to.exist;
                    const result= JSON.parse(body);
                    expect(result.name).to.equal(name);
                    expect(result.surname).to.equal(surname);
                    expect(result.username).to.equal(email);
                    expect(result.password).to.be.undefined;
                    //Ahora que lo hemos comprobado borramos el nombre de la lista
                    call("DELETE","https://skylabcoders.herokuapp.com/api/v2/users",`{ "password": "${password}"}`,
                    {"Content-type": "application/json", "Authorization": `Bearer ${token}`},(error,status,body)=>{
                        expect(error).to.be.undefined;
                        expect(status).to.equal(204);
                        expect(body).to.equal("");
                        done();
                    })
                }) 
                
            })
        });
        
    }).timeout(5000)
    
    it("should not let you register the same email more than once",done=>{
        //Registrar el email de estrangis
        call("POST","https://skylabcoders.herokuapp.com/api/v2/users",
        `{ "username": "${email}","password": "${password}", "name": "${name}", "surname": "${surname}" }`,
        { 'Content-type': 'application/json' },
        (error,status,body)=>{
            //Tratar de registrarlo correctamente
            registerUser(name,surname,email,password,(error)=>{
            expect(error).to.exist;
            //Comprobar que se ha registrado bien
            //Primero coge el token
            call("POST","https://skylabcoders.herokuapp.com/api/v2/users/auth",
            `{ "username": "${email}","password": "${password}" }`, {"Content-type": "application/json"},(error,status,body)=>{
                expect(error).to.be.undefined;
                expect(status).to.equal(200);
                expect(body).to.exist;
                const token=JSON.parse(body).token;
                //Ahora usa el token para acceder a sus datos
                call("GET", 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, 
                {'Authorization': `Bearer ${token}`},(error,status,body)=>{
                    expect(error).to.be.undefined;
                    expect(status).to.equal(200);
                    expect(body).to.exist;
                    const result= JSON.parse(body);
                    expect(result.name).to.equal(name);
                    expect(result.surname).to.equal(surname);
                    expect(result.username).to.equal(email);
                    expect(result.password).to.be.undefined;
                    //Ahora que lo hemos comprobado borramos el nombre de la lista
                    call("DELETE","https://skylabcoders.herokuapp.com/api/v2/users",`{ "password": "${password}"}`,
                    {"Content-type": "application/json", "Authorization": `Bearer ${token}`},(error,status,body)=>{
                        expect(error).to.be.undefined;
                        expect(status).to.equal(204);
                        expect(body).to.equal("");
                        done();
                    })
                }) 
                
            })
            })
        })
        

    }).timeout(5000)
    
    it("should throw error on inputs that do not match the specified format",() => {
        let name= '%%Pau',
        surname="surname",
        email="d@mail.com",
        password="password1";
        expect(() => {
            registerUser(name,surname,email,password)
        }).to.throw(Error, "%%Pau does not match the format")
        name= "name",
        surname= 'Hector//',
        email="f@mail.com",
        password="password1";
        expect(() => {
            registerUser(name,surname,email,password)
        }).to.throw(Error, "Hector// does not match the format")
        name= "name",
        surname="surname",
        email= 'Marc&&',
        password="password1";
        expect(() => {
            registerUser(name,surname,email,password)
        }).to.throw(Error, "Marc&& is not an e-mail")
        name= "name",
        surname="surname",
        email="g@mail.com",
        password= 'Hector';
        expect(() => {
            registerUser(name,surname,email,password)
        }).to.throw(Error, "password does not have the min length")
        
    
    })
    it("should throw error on non-string inputs", () => {
        let name= {},
        surname="surname1",
        email="a@mail.com",
        password="password1";
        

        expect(() => {
            registerUser(name,surname,email,password)
        }).to.throw(TypeError, '[object Object] is not a string')

        name= "name",
        surname= 1,
        email="b@mail.com",
        password="password1";
        

        expect(() => {
            registerUser(name,surname,email,password)
        }).to.throw(TypeError, "1 is not a string")

        name= "name",
        surname="surname",
        email= 1,
        password="password1";
        

        expect(() => {
            registerUser(name,surname,email,password)
        }).to.throw(TypeError, "1 is not a string")
        
        name= "name",
        surname="surname",
        email="c@mail.com",
        password= 17894546;
        

        expect(() => {
            registerUser(name,surname,email,password)
        }).to.throw(TypeError, "17894546 is not a string")
        name= "name",
        surname="surname",
        email="g@mail.com",
        password= '123123123';
        expect(() => {
            registerUser(name,surname,email,password,"notafunction")
        }).to.throw(TypeError, "notafunction is not a function")
    })

})
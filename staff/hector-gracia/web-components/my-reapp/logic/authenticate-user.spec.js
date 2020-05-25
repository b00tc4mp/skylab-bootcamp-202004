false && describe("authenticateUser",function(){
    let name,surname,email,password;
    beforeEach(function(){
        name=names.random();
        surname=surnames.random();
        email= `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`;
        password=passwords.random();
    })
    it("should return a token if there is a user with the specified email and password in the API",(done)=>{
        //Registrar el email de estrangis
        call("POST","https://skylabcoders.herokuapp.com/api/v2/users",
        `{ "username": "${email}","password": "${password}", "name": "${name}", "surname": "${surname}" }`,
        { 'Content-type': 'application/json' },
        (error,status,body)=>{
            //Comprobar que este usuario existe y que tiene esa contraseña
            authenticateUser(email,password,(error,token)=>{
                expect(error).to.be.undefined;
                expect(token).to.exist;
                //Ahora que lo hemos comprobado borramos el nombre de la lista
                call("DELETE","https://skylabcoders.herokuapp.com/api/v2/users",
                `{ "password": "${password}"}`,
                {"Content-type": "application/json", "Authorization": `Bearer ${token}`},
                (error,status,body)=>{
                    expect(error).to.be.undefined;
                    expect(status).to.equal(204);
                    expect(body).to.equal("");
                    done();
                })
            })
        })
    }).timeout(5000)
    it("should return an error if there isn't any user with the specified email and password",(done)=>{
        authenticateUser(email,password,(error,token)=>{
            expect(error).to.exist;
            expect(token).to.be.undefined;
            done();
        })
    }).timeout(5000)
    it("should return an error if the email is not a string",function(){
        users.push({name,surname,email,password});
        let _email=132143;
    
        expect(function(){authenticateUser(_email,password)}).to.throw(Error, _email+" is not a string")
    });
    it("should throw an error if the email doesn't pass the regex test",function(){
        users.push({name,surname,email,password});
        let _email="correososo";
        
    
        expect(function(){authenticateUser(_email,password)}).to.throw(Error, _email+" is not an e-mail");
    });
    it("should throw an error if password is not a string",function(){
        users.push({name,surname,email,password});
        let _password=123123123;
        expect(function(){authenticateUser(email,_password)}).to.throw(Error, _password+" is not a string");
        _password=true;
        expect(function(){authenticateUser(email,_password)}).to.throw(Error, _password+" is not a string");
        _password=[];
        expect(function(){authenticateUser(email,_password)}).to.throw(Error, _password+" is not a string");
        _password={};
        expect(function(){authenticateUser(email,_password)}).to.throw(Error, _password+" is not a string");
    });7
    it("should throw an error if not given a callback function",()=>{
        expect(function(){authenticateUser(email,password,"notacallback")}).to.throw(TypeError, "notacallback is not a function");
    })
})
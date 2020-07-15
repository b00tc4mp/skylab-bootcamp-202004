describe("registerUser",function(){
    let name,surname,email,password;
    beforeEach(function(){
        users.length=0;
        name=names.random();
        surname=surnames.random();
        email= `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`;
        password=passwords.random();
    })

    it("should register a new user if there are no anomalies",function(){
        registerUser(name,surname,email,password);
        const user= users.find(function(user){return user.email===email;})
        expect(user).to.exist
    })

    it("should fail to register a user if the email is already in use",function(){
        let name="name",
        surname="surname",
        email="e@mail.com",
        password="password1";
        users.push({name, surname, email,password})

        expect(function(){
            registerUser(name,surname,email,password)
        }).to.throw(Error, "user already exist")
    
    })

    it("should throw error on non-string inputs", function(){
        let name= {},
        surname="surname1",
        email="a@mail.com",
        password="password1";
        

        expect(function(){
            registerUser(name,surname,email,password)
        }).to.throw(Error, '[object Object] is not a string')

        name= "name",
        surname= 1,
        email="b@mail.com",
        password="password1";
        

        expect(function(){
            registerUser(name,surname,email,password)
        }).to.throw(Error, "1 is not a string")

        name= "name",
        surname="surname",
        email= 1,
        password="password1";
        

        expect(function(){
            registerUser(name,surname,email,password)
        }).to.throw(Error, "1 is not a string")
        
        name= "name",
        surname="surname",
        email="c@mail.com",
        password= 17894546;
        

        expect(function(){
            registerUser(name,surname,email,password)
        }).to.throw(Error, "17894546 is not a string")
    })

    it("should throw error on inputs that do not match the specified format",function(){
        let name= '%%Pau',
        surname="surname",
        email="d@mail.com",
        password="password1";
        

        expect(function(){
            registerUser(name,surname,email,password)
        }).to.throw(Error, "%%Pau does not match the format")

        name= "name",
        surname= 'Hector//',
        email="f@mail.com",
        password="password1";
        

        expect(function(){
            registerUser(name,surname,email,password)
        }).to.throw(Error, "Hector// does not match the format")

        name= "name",
        surname="surname",
        email= 'Marc&&',
        password="password1";
        

        expect(function(){
            registerUser(name,surname,email,password)
        }).to.throw(Error, "Marc&& is not an e-mail")
        
        name= "name",
        surname="surname",
        email="g@mail.com",
        password= 'Hector';
        

        expect(function(){
            registerUser(name,surname,email,password)
        }).to.throw(Error, "password does not have the min length")
    
    })
})
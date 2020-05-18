describe("retrieveUser", function(){
    
    let name,surname,email,password;
    beforeEach(function(){
        users.length=0;
        name=names.random();
        surname=surnames.random();
        email= `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`;
        password=passwords.random();
        users.push({name: name, surname: surname, email: email, password: password})
    })
    
    it("should return a specified user", function(){
        let result = retrieveUser(email)
        
        expect(result).to.deep.equal({name: name, surname: surname, email: email, password: password})
    })

    it("should return an error email is not a string", function(){
        expect(function(){
            retrieveUser(123)
        }).to.throw(TypeError, '123 is not a string') 

    })

    it("should return an error the email does not pass the criteria", function(){
        expect(function(){
            retrieveUser("123")
        }).to.throw(Error, '123 is not an e-mail') 

    })

    it("should return an error if sending no arguments", function(){
        expect(function(){
            retrieveUser()
        }).to.throw(TypeError, undefined+' is not a string') 

    })
})
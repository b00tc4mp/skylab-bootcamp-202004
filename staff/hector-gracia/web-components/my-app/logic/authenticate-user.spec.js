describe("authenticateUser",function(){
    let name,surname,email,password;
    beforeEach(function(){
        users.length=0;
        name=names.random();
        surname=surnames.random();
        email= `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`;
        password=passwords.random();
    })
    it("should not return an error if the email and passwordmatch",function(){
        users.push({name,surname,email,password});
        
    
        expect(function(){authenticateUser(email,password)}).not.to.throw(Error,"wrong credentials")
    });
    it("should throw an error if email and password doesn't match",function(){
        users.push({name,surname,email,password});
        
    
        expect(function(){authenticateUser(email,"password123")}).to.throw(Error,"wrong credentials")
    });
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
    });
    it("should throw an error",function(){
        users.push({name,surname,email,password});
        const _password="  ";
        
    
        expect(function(){authenticateUser(email,_password)}).to.throw(Error,"password is empty or blank")
    });
});
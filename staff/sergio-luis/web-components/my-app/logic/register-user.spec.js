describe('Register Users', () => {
    let name, surname, email, password;

    beforeEach(function(){
        users.length = 0;
        name = names.random();
        surname = surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random();
    })
        
    it('should succeed on correct data', ()=>{
        registerUser(name,surname,email,password);

        const user = users.find((user)=> user.email===email)

        expect(user).to.exist
    })

    it('should fail when users alredy exist', ()=>{
        users.push({ name, surname, email, password })
        expect(()=>{
            registerUser(name,surname,email,password);
        }).to.throw(Error, 'user already exists')
    });

    it('should fail on non-string field typeError', ()=>{
        expect(()=>{
            registerUser(undefined,surname,email,password);
        }).to.throw(TypeError, 'undefined is not a string');
        expect(()=>{
            registerUser(name,undefined,email,password);
        }).to.throw(TypeError, 'undefined is not a string');
        expect(()=>{
            registerUser(name,surname,undefined,password);
        }).to.throw(TypeError, 'undefined is not a string');
        expect(()=>{
            registerUser(name,surname,email,undefined);
        }).to.throw(TypeError, 'undefined is not a string');
        expect(()=>{
            registerUser(1,surname,email,password);
        }).to.throw(TypeError, '1 is not a string');
        expect(()=>{
            registerUser(name,true,email,password);
        }).to.throw(TypeError, 'true is not a string');
        expect(()=>{
            registerUser(name,surname,false,password);
        }).to.throw(TypeError, 'false is not a string');
        expect(()=>{
            registerUser(name,surname,email,23);
        }).to.throw(TypeError, '23 is not a string');
    });

    it('should fail on text Regex', ()=>{
        expect(()=>{
            registerUser('nuri!a',surname,email,password);
        }).to.throw(Error, 'nuri!a is not alphabetic');
        expect(()=>{
            registerUser(name,'nuri!a',email,password);
        }).to.throw(Error, 'nuri!a is not alphabetic');
        expect(()=>{
            registerUser(name,surname,'luis..luis.com',password);
        }).to.throw(Error, 'luis..luis.com is not an e-mail');
        expect(()=>{
            registerUser(name,surname,email,'123123');
        }).to.throw(Error, 'password does not have the min length');
   
    });

})
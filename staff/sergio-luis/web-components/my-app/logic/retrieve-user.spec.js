describe('Retrive Users', () => {
    let name, surname, email, password;

    beforeEach(function(){
        users.length = 0;
        name = names.random();
        surname = surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random();

        users.push({name,surname,email,password})
    })
        
    it('should succeed on exist user', ()=>{
        var user = retrieveUser(email)
        expect(user).to.exist
    
    })

    it('should fail on incorrect tex Reget email', ()=>{
    
        expect(()=>{
            retrieveUser('sergio.mail.com')
        }).to.throw(Error, 'sergio.mail.com is not an e-mail');
    })

    it('should fail on not string email', ()=>{
      
         expect(()=>{
             retrieveUser(123)
         }).to.throw(TypeError, '123 is not a string');
         expect(()=>{
            retrieveUser(true)
        }).to.throw(TypeError, 'true is not a string');
     })
})
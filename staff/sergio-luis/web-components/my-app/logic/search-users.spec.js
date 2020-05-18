describe('Search Users', () => {
    let name, surname, email, password;

    beforeEach(function(){
        users.length = 0;
        name = names.random();
        surname = surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random();

        users.push({name,surname,email,password})
    })
        
    it('should succeed to exist user', ()=>{
    
        const user = searchUsers(name);
        expect(user).to.exist
    
    })

    it('should sucess to find 2 users with similar name', ()=>{
        registerUser('simon',surname,'simon@mail.com',password);
        registerUser('sergio',surname,'sergio@mail.com',password);
    
        const user = searchUsers('s'); 
        expect(user.length).to.equal(2)
    })

    it('should show all users', ()=>{
        registerUser('simon',surname,'simon@mail.com',password);
        registerUser('sergio',surname,'sergio@mail.com',password);
        
        const user = searchUsers('')
        expect(user.length).to.equal(3)
    })
    it('should don`t show any user', ()=>{
  
        const user = searchUsers('kjshsdfdsdsfgdsf')
        expect(user.length).to.equal(0)
    })
})   
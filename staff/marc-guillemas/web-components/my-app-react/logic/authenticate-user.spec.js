describe("authenticateUser",function(){
    

    let name,surname,email,password
    
    beforeEach(function(){
        users.length=0
       
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        users.push({name,surname,email,password})
    })


    it("should succeed on correct data",function(){
        // const name="name1",
        // surname="surname1",
        // email="e@mail.com",
        // password="password1";
        // users.push(name,surname,email,password);

        // user=
        expect(function(){
            aunthenticateUser(email,password)
        }).not.to.throw()

        // expect(user).to.exist
    });
});
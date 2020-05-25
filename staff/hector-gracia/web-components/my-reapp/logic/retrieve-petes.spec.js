describe("retrievePetes", function(){
    it("should return the petes of all the users that are following", function(){
        let before=Date.now();
        //Crea los usuarios
        const user1= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        const user2= new User("Fran","Perez","franperez@mail.com","123123123");
        const user3= new User("Maria","Lunarillos","marialunarillos@mail.com","123123123");
        //Se siguen entre ellos
        user1.follow(user2);
        user1.follow(user3);
        //Escriben petes
        user2.makePete("hola mundo");
        while(Date.now() - before < 5);
        before=Date.now();
        user3.makePete("hello world");
        while(Date.now() - before < 5);
        before=Date.now();
        user2.makePete("Estoy usando peter");
        while(Date.now() - before < 5);
        before=Date.now();
        user3.makePete("I am using peter");
        //Hace el retrieve
        let result=retrievePetes(user1);
        expect(result.length).to.equal(4);
        expect(result[0].message).to.equal("I am using peter");
        expect(result[1].message).to.equal("Estoy usando peter");
        expect(result[2].message).to.equal("hello world");
        expect(result[3].message).to.equal("hola mundo");
        //Hace unfollow y vuelve a comprobar
        user1.unfollow(user3);
        result= retrievePetes(user1);
        expect(result.length).to.equal(2);
        expect(result[0].message).to.equal("Estoy usando peter");
        expect(result[1].message).to.equal("hola mundo");
    })
    it("should return an empty array if the user doesn't follow nobody or if the users he follows haven't pos anything", function(){
        const user1= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        let result = retrievePetes(user1);
        expect(result.length).to.equal(0);
        const user2 = new User("Maria","Lunarillos","marialunarillos@mail.com","123123123");
        user1.follow(user2);
        result= retrievePetes(user1);
        expect(result.length).to.equal(0);
    })
    //Errores
    it("should throw an error when given no user or a wrong argument", function(){
        expect(function(){
            retrievePetes();
        }).to.throw(Error,"user is not defined");
        expect(function(){
            retrievePetes("usuario");
        }).to.throw(TypeError,"usuario is not a User");
    })
})
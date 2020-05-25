describe("User", function(){
    it("should create an User", function(){
        let newUser= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        expect(newUser.name).to.equal("Juan");
        expect(newUser.surname).to.equal("Fernandez");
        expect(newUser.email).to.equal("juanfernandez@mail.com");
    })
    //Errores de no pasarle strings TODO Errores de formato en el email
    it("should throw an error if the user doesn't meet the requirements", function(){
        expect(function(){
            let newUser= new User(123,"Fernandez","juanfernandez@mail.com","123123123");
        }).to.throw(TypeError, 123+' is not a string'); 
        expect(function(){
            let newUser= new User("Miguel",123,"juanfernandez@mail.com","123123123");
        }).to.throw(TypeError, 123+' is not a string');
        expect(function(){
            let newUser= new User("Miguel","Fernandez",123,"123123123");
        }).to.throw(TypeError, 123+' is not a string');
    })
    //Funciones de seguimiento entre usuarios
    it("should follow an User", function(){
        let follower= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        let secondfollower= new User("Guillermo","Perez","guillermoperez@mail.com","123123123");
        let followed= new User("Alberto","Gutierrez","albertogutierrez@mail.com","123123123");
        follower.follow(followed);
        expect(followed.followers.length).to.equal(1);
        expect(followed.followers[0]).to.equal(follower);
        expect(follower.following.length).to.equal(1);
        expect(follower.following[0]).to.equal(followed);
        secondfollower.follow(followed);
        expect(followed.followers.length).to.equal(2);
        expect(followed.followers[1]).to.equal(secondfollower);
        expect(secondfollower.following.length).to.equal(1);
        expect(secondfollower.following[0]).to.equal(followed)
    })
    //Errores de seguimiento
    it("should throw an error when not given an user to follow", function(){
        let newUser= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        
        expect(function(){
            newUser.follow(123);
        }).to.throw(TypeError, 123+' is not a User');
        expect(function(){
            newUser.follow();
        }).to.throw(TypeError, 'Cannot read property \'constructor\' of undefined');
    })
    //Crear un nuevo Pete
    it("should make a Pete", function(){
        let newUser= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        newUser.makePete("hola mundo");
        expect(newUser.petes.length).to.equal(1);
        expect(newUser.petes[0].message).to.equal("hola mundo");
    })
    //Errores al crear un pete
    it("should throw an error when the pete is not given a message", function(){
        let newUser= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        
        expect(function(){
            newUser.makePete(123);
        }).to.throw(TypeError, 123+' is not a string');
    })
    //Darle like a un pete
    it("should like a Pete", function(){
        const user1= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        const user2= new User("Ramon","Cajal","ramonycajal@mail.com","123123123");
        const pete= new Pete("hola mundo",user2);
        user1.likePete(pete);
        expect(user1.liked.length).to.equal(1);
        expect(user1.liked[0]).to.equal(pete);
        expect(pete.likes).to.equal(1);
        expect(pete.likedFrom.length).to.equal(1);
        expect(pete.likedFrom[0]).to.equal(user1);
    })
    //Errores al darle like a un Pete
    it("should throw an error when there is no pete to like", function(){
        const user1= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        const user2= new User("Ramon","Cajal","ramonycajal@mail.com","123123123");
        const pete= new Pete("hola mundo",user2);
        
        expect(function(){
            user1.likePete(123);
        }).to.throw(TypeError, 123+' is not a Pete');
        expect(function(){
            user1.likePete();
        }).to.throw(Error, "target is not defined");
    })
    //Unfollow usuarios
    it("should unfollow users",function(){
        const user1= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        const user2= new User("Ramon","Cajal","ramonycajal@mail.com","123123123");
        const user3= new User("Dolores","Fuertes","doloresfuertes@mial.com","123123123");
        user2.follow(user1);
        user3.follow(user1);
        user2.unfollow(user1);
        expect(user1.followers.length).to.equal(1);
        expect(user1.followers[0]).to.equal(user3);
        expect(user2.following.length).to.equal(0);
        expect(user3.following.length).to.equal(1);
    })
    //Errores de unfollow
    it("should throw an error if trying to unfollow a user it wasn't following before",function(){
        const user1= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        const user2= new User("Ramon","Cajal","ramonycajal@mail.com","123123123");
        expect(function(){
            user1.unfollow(user2);
        }).to.throw(Error,"user was not already following the target");
    })
    it("should throw an error if trying to unfollow with wrong parameters",function(){
        const user1= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        const user2= new User("Ramon","Cajal","ramonycajal@mail.com","123123123");
        user1.follow(user2);
        expect(function(){
            user1.unfollow();
        }).to.throw(Error,"target is not defined");
        expect(function(){
            user1.unfollow(123);
        }).to.throw(Error,123+" is not a User");
    })
})
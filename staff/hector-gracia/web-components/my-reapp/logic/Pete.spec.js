describe("Pete", function(){
    it("should create a Pete", function(){
        let newUser= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        let newPete= new Pete("hola mundo",newUser);
        expect(newPete.user).to.equal(newUser);
        expect(newPete.message).to.equal("hola mundo");
        expect((Date.now()-newPete.date)<100).to.equal(true);// no se como comparar la hora mejor
        expect(newPete.likes).to.equal(0);
    })
    //Errores al crearlo
    it("should throw an error when given incorrect parameters", function(){
        const newUser= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        expect(function(){
            const newPete= new Pete(123,newUser);
        }).to.throw(TypeError, 123+' is not a string');
        expect(function(){
            const newPete= new Pete("hola mundo",123);
        }).to.throw(TypeError, 123+' is not a User');
        expect(function(){
            const newPete= new Pete();
        }).to.throw(TypeError, undefined+' is not a string');
        expect(function(){
            const newPete= new Pete("hola mundo");
        }).to.throw(TypeError, 'Cannot read property \'constructor\' of undefined');
    })
    //Cuando le dan a like
    it("should be liked", function(){
        let newUser= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        let newPete= new Pete("hola mundo",newUser);
        newPete.liked(newUser);
        expect(newPete.likes).to.equal(1);
        expect(newPete.likedFrom.length).to.equal(1);
        expect(newPete.likedFrom[0]).to.equal(newUser);
    })
    //Errores cuando le dan a like
    it("should throw an error when liked with the wrong parameters", function(){
        let newUser= new User("Juan","Fernandez","juanfernandez@mail.com","123123123");
        let newPete= new Pete("hola mundo",newUser);
        expect(function(){
            newPete.liked("Juan");
        }).to.throw(TypeError,"Juan is not a User");
        expect(function(){
            newPete.liked();
        }).to.throw(Error,"user is not defined");
    })
})
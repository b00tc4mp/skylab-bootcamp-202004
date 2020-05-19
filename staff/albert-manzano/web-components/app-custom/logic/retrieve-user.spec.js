describe("retrieveUser", function(){
    it("should return a specified user", function(){
        const result = retrieveUser("vetu87@gmail.com")
        expect(result).to.deep.equal({name: "albert", surname:"manzano", email:"vetu87@gmail.com", password: "123123123"})
    })

    it("should return an error email is not a string", function(){
        expect(function(){
            retrieveUser(123)
        }).to.throw(TypeError, '123 is not a string') 

    })

    it("should return an error not passing the criteria", function(){
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
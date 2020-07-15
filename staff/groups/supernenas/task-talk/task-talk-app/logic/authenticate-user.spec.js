describe("authenticateUser",()=>{
    it("should throw an error if called with the wrong type of parameters",()=>{
        expect(function(){
            authenticateUser(undefined,()=>{})
        }).to.throw(TypeError, undefined+" is not a function")
        expect(function(){
            authenticateUser("notafuntion",()=>{})
        }).to.throw(TypeError, "notafuntion"+" is not a function")
        expect(function(){
            authenticateUser(()=>{},undefined)
        }).to.throw(TypeError, undefined+" is not a function")
        expect(function(){
            authenticateUser(()=>{},"notafunciton")
        }).to.throw(TypeError, "notafunciton"+" is not a function")
    })
})
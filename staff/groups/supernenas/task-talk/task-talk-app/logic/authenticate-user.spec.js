describe("authenticateuser",()=>{
    it("should throw an error if called with the wrong type of parameters",()=>{
        expect(function(){
            authenticateuser(undefined,()=>{})
        }).to.throw(TypeError, undefined+" is not a function")
        expect(function(){
            authenticateuser("notafuntion",()=>{})
        }).to.throw(TypeError, "notafuntion"+" is not a function")
        expect(function(){
            authenticateuser(()=>{},undefined)
        }).to.throw(TypeError, undefined+" is not a function")
        expect(function(){
            authenticateuser(()=>{},"notafunciton")
        }).to.throw(TypeError, "notafunciton"+" is not a function")
    })
})
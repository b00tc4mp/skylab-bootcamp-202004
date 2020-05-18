describe("arroz.prototype.find-index.js", function(){
    it("should return the index of the specified value",function(){
        var arr = new Arroz(4,1,4,6,3,2)

        var result = arr.findIndex(function(element, i, arr){
            return element > 4;
        })

        expect(result).toBe(3)
    })

    it("should return an error callback is not a function",function(){
        var arr = new Arroz(4,1,4,6,3,2)

        expect(function(){
            arr.findIndex()
        }).toThrowError(TypeError, "undefined must be a function")
  
    })

    it("should return an error callback is not a function",function(){

        expect(function(){
            findIndex()
        }).toThrowError(ReferenceError, " is not defined")
  
    })
})


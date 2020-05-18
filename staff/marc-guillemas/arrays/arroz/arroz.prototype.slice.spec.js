describe("arroz.prototype.slice.js", function(){
    it("should return a new array of elements from the begining number to the end of the arroz ", function(){
        var arr = new Arroz(1,2,3,4,5)
        var result = arr.slice(3);

        expect(result).toEqual([4,5])
    })

    it("should return a new array of elements from the begining number to the end number", function(){
        var arr = new Arroz(1,2,3,4,5)
        var result = arr.slice(1,3);

        expect(result).toEqual([2,3])
    })

    it("should return a new array of elements from the begining negative number to the end of the arroz", function(){
        var arr = new Arroz(1,2,3,4,5)
        var result = arr.slice(-3);

        expect(result).toEqual([3,4,5])
    })



    it("should return a new array of elements from the begining number to the end negative number ", function(){
        var arr = new Arroz(1,2,3,4,5)
        var result = arr.slice(2,-1);

        expect(result).toEqual([3,4])
    })
    
    
    it("should return a new array of elements from the begining number to the end negative number testing with strings ", function(){
        var arr = new Arroz('ant', 'bison', 'camel', 'duck', 'elephant')
        var result = arr.slice(1,-1);

        expect(result).toEqual(['bison', 'camel', 'duck'])
    })
})
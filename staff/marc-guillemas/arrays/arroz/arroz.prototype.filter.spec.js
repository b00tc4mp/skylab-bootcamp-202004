describe("Arroz.prototype.filter", function(){
    it("should return a new array with the filtered elements", function(){
        var arr = new Arroz("betho","llorch","kau","stivi","nil");
        var result = arr.filter(function(element) {

            return element.length < 5;
        });

        expect(result[0]).toBe("kau")
        expect(result[1]).toBe("nil")
        
    })

    it("should return a new array with the filtered elements", function(){
        var arr = new Arroz(4,56,23,65,21);
        var result = arr.filter(function(element) {
            
            return element > 50;
        });

        expect(result[0]).toBe(56)
        expect(result[1]).toBe(65)
        
    })

    it("should return a type error", function(){
        expect(function(){
            var arr = new Arroz(2,4,2,6,8);

            arr.filter();
        }).toThrowError(TypeError, "undefined is not a function")
        
    })
})
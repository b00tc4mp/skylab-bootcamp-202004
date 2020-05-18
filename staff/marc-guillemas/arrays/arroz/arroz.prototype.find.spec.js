describe("arroz.prototype.find", function(){
    it("should return the first element complying the conditions especified in the function below", function(){
        var arr = new Arroz(2,64,35,67,21,43);

        var result = arr.find(function(element, i, arr){
            return element > 64;
        })
        expect(result).toBe(67)
    });
    
    it("should return the first element complying the conditions especified in the function below", function(){
        var arr = new Arroz("hey","you","buddy","are","you");

        var result = arr.find(function(element, i, arr){
            return element.length > 4;
        })
        expect(result).toBe("buddy")
    });

    it("should return a type error", function(){
        
        var arr = new Arroz("hey","you","buddy","are","you");
        
        expect(function(){
           arr.find();                 
        }).toThrowError(TypeError, "undefined is not a function");
        
    });
});
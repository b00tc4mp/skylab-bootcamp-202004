describe("arroz.prototype.includes.js",function(){
    it("should return true if the element entered was found in the arroz", function(){
        var arr = new Arroz(1,4,6,3,7,2);
        
        var result = arr.includes(6)

        expect(result).toBeTruthy();

    });

    it("should return true if the element entered was found in the arroz", function(){
        var arr = new Arroz("hey","you","buddy","what's","up!");
        
        var result = arr.includes("buddy")
        expect(result).toBeTruthy();
    
    });
});
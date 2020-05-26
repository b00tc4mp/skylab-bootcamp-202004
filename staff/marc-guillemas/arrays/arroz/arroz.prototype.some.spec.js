describe("arroz.prototype.some.js", function() {    
    
    it('should return true if ', function() {
        
        var arr = new Arroz(1,5,2,8,21,15);
        var result = arr.some(function(element){
            return element > 5;
        });
        expect(result).toBeTruthy();
        
        
    });

    it('should fail when callback is not a function', function() {
        try{
            var arr = new Arroz(1,5,2,8,21,15);
            var result = arr.some();
        }catch(error){
           expect(error.message).toBe("undefined is not a function");      
        }
        
    });
        

}); 
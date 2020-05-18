describe("arroz.prototype.index-of.js", function() {
    

    it("should return index of the value you entered", function(){ 
        var arr = new Arroz(1,2,3,4,5)
        var result = arr.indexOf(3);

        expect(result).toBe(2);
    });
    
    
});
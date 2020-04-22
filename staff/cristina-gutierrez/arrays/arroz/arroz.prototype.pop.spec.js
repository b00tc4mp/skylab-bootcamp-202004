describe('Arroz.prototype.pop', function(){
    
    it("should return the deleted element of the array", function() {
        var arroz = new Arroz(1, 2, 3);
        var result = arroz.pop();
        
        expect(result).toBe(3);
    })

    it("should return the new array and its new length after pop()", function() {
        var arroz = new Arroz(1, 2, 3);
        arroz.pop();
        var result = Object.values(arroz);

        expect(result).toEqual([1, 2, 2])
    })
});
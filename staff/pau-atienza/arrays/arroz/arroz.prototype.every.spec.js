'use strict'

describe('every', function() {
      
    it('should iterate through all elements and compare them to an expression, if all are true, return true otherwise, returns false ', function() {
        var array = new Arroz(1, 2, 3);
        
        var result = array.every(function(element) {
            return element > 2;
        });

        expect(result).toBe(false);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });
});
'use strict'

describe('Arroz.prototype.every', function() {
      
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
    it('should iterate through all elements and compare them to an expression, if all are true, return true otherwise, returns false ', function() {
        var array = new Arroz(1, 2, 3);
        
        var result = array.every(function(element) {
            return element < 4;
        });

        expect(result).toBeTruthy();
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });

    it("it should throw error if type expresion doesn't compute",function(){
        var array = new Arroz(1, 2, 3);

        expect(function() {
            array.every(true);
        }).toThrowError(TypeError, 'true is not a function');

    });
});
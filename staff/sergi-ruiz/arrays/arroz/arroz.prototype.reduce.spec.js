'use strict';


describe('Arroz.prototype.reduce', function() {
    it('should sum all numbers and return if the array is made of numbers', function() {
        var array = new Arroz(1, 2, 3);

        var result = array.reduce(function(acumulator, value) {
            return acumulator + value;
        });
        expect(result).toBe(6);
    });
    it('should give an error when called without giving an argument', function() {
        var array = new Arroz(1, 2, 3);
        var result;
        try {
            result = array.reduce();
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe("expresion is not a function");
    });
});
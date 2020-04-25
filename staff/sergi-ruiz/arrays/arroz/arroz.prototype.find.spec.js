'use strict';

describe('Arroz.prototype.find', function() {
    it('should return the first value of the arroz that is NaN', function() {
        var array = new Arroz(0, 1, 2, "c", 4, 5, 6, 7, 8, 9);
        var result;

        result = array.find(function(element) {
            return isNaN(element);
        });
        expect(result).toBe("c");
    });
    it('should return undefined if there is no element like that in the arroz', function() {
        var array = new Arroz(0, 1, 2, 4, 5, 6, 7, 8, 9);
        var result;

        result = array.find(function(element) {
            return isNaN(element);
        });
        expect(result).toBe(undefined);
    });
    it('should give an error when called without giving a callback parameter', function() {
        var array = new Arroz(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        var result;

        try {
            result = array.find();
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe("expresion is not a function");
    });
});
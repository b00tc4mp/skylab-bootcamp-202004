'use strict';

describe('Arroz.prototype.every', function() {
    it('should check if all elements of the arroz are numbers', function() {
        var array = new Arroz(0, 1, 2, 3);
        var result = false;

        result = array.every(function(element, index) {
            return typeof element === "number";
        });

        expect(result).toBe(true);
    });
    it('should give an error when called without giving a callback parameter', function() {

        var array = new Arroz(0, 1, 2, 3);
        var result = false;

        try {
            result = array.every();
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe("expresion is not a function");
    });
});
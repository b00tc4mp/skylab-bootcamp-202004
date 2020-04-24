'use strict';

describe('Arroz.prototype.find-index', function() {
    it('should return the first time NaN appears in the arroz', function() {
        var arroz = new Arroz(0, 1, 2, 3, 4, 5, 6, 7, 'fail', 9);
        var result;

        result = arroz.findIndex(function(element) {
            return isNaN(element);
        });
        expect(result).toBe(8);
    });
    it('should return -1 if there is no element that fills that criteria', function() {
        var arroz = new Arroz(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        var result;

        result = arroz.findIndex(function(element) {
            return isNaN(element);
        });
        expect(result).toBe(-1);
    });
    it('should give an error when called without giving a callback parameter', function() {
        var arroz = new Arroz(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        var result;
        var _error;
        try {
            result = arroz.findIndex();
        } catch (error) {
            _error = error;
        }

        expect(_error.message).toBe("expresion is not a function");
    });
});
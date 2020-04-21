'use strict';

describe('Arroz.prototype.some', function () {
    it('should iterate on each element and return true because we want to obtain element 3', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result = array.some(function(element) { return element === 3 })

        expect(result).toBeTruthy();
    });

    it('should  return false because we are passing an empty array', function () {
        var array = new Arroz();

        var result = array.some(function(element, index) {
            if (element === 24) {
                return true;
            }
        });

        expect(result).toBeFalsy();
    });

    it('should iterate on each element and return false because we want to element 24 which does not exist', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result = array.some(function(element) { return element === 24 });

        expect(result).toBeFalsy();
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = new Arroz(1, 2, 3);
        var result = new Arroz();

        array.some(function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = new Arroz(1, 2, 3);
        var result = new Arroz();

        array.some(function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });
    
    it('try to verify that no function argument throws the next error \' <arguments> is not a function\'', function () {
        var array = new Arroz(1, 2, 3);

        expect(function() {
            array.some()
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function() {
            array.some(1);
        }).toThrowError(TypeError, '1 is not a function');

        expect(function() {
            array.some(true);
        }).toThrowError(TypeError, 'true is not a function');
    
    });
});
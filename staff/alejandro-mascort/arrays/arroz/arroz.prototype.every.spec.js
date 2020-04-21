'use strict';

describe('Arroz.prototype.every', function () {
    it('should iterate on each element and return false because we want to obtain element all elements as 3', function () {
        var array = new Arroz (1, 2, 3, 4, 5, 6);

        var result = array.every(function(element) { return element === 3 })

        expect(result).toBeFalsy();
    });

    it('should  return true because we are passing an empty array', function () {
        var array = new Arroz();

        var result = array.every(function(element) { return element === 3 })

        expect(result).toBeTruthy();
    });

    it('should iterate on each element and return true because all elements satisfy element equals 2', function () {
        var array = new Arroz(2, 2, 2, 2, 2, 2);

        var result = array.every(function(element){ return element === 2; });

        expect(result).toBeTruthy();
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = new Arroz(2, 2, 2);
        var result = new Arroz();

        array.every(function(element, index, array) {
            result[index] = index;
            return element === 2;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = new Arroz(2, 2, 2);
        var result = new Arroz();

        array.every(function(element, index, array) {
            result[index] = array;
            return element === 2;
        });

        expect(result[0]).toEqual(array);
        expect(result[1]).toEqual(array);
        expect(result[2]).toEqual(array);
    });

    it('try to verify that no function argument throws the next error \' <arguments> is not a function\'', function () {
        var array = new Arroz(1, 2, 3);

        expect(function() {
            array.every()
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function() {
            array.every(1);
        }).toThrowError(TypeError, '1 is not a function');

        expect(function() {
            array.every(true);
        }).toThrowError(TypeError, 'true is not a function');
    
    });
});
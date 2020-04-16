'use strict';

describe('map', function () {
    it('should iterate on each element and keep each value multiplied by 10 in a new external array', function () {
        var array = [1, 2, 3];
        

        var result = map(array, function(element, index) {
            return element * 10;
        });

        expect(result[0]).toBe(10);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(30);
    });

    it('should iterate on each element and keep each value in upper-case in a new external array', function () {
        var array = ['hello', 'cruel', 'world'];
       

        var result = map(array, function(element, index) {
            return element.toUpperCase();
        });

        expect(result[0]).toBe('HELLO');
        expect(result[1]).toBe('CRUEL');
        expect(result[2]).toBe('WORLD');
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        var result = map(array, function(element, index, array) {
            return index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        var result = map(array, function(element, index, array) {
            return array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });
});
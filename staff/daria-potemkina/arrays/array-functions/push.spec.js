'use strict'

describe('push', function () {
    it('it should put in the array any type of data that you pass as a parameter to the method', function () {
        var array = [];

        var result = push(array, 2);

        expect(array[0]).toBe(2);
        expect(result).toBe(1);
    });

    
    it('it should put in the array all elements passed in a function', function () {
        var array = [1, 2];

        var result = push(array, 'pepito', 4);

        expect(array).toEqual([1, 2, "pepito", 4])
        expect(result).toBe(4);
        });

})
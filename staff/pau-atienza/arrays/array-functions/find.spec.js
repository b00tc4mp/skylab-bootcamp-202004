'use strict';

describe('The find method', function () {
    it('returns the value of the first element in the provided array that satisfies the provided testing function' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = find(array, function(element, i, array){return element > 10});

        expect(result).toBe(12);
    });
    it('returns undefined if no elements in the provided array satisfy the provided testing function' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = find(array, function (element, i, array){return element > 200});

        expect(result).toBe(undefined);
    });
    it('returns undefined if the length of the array is 0' , function () {
        var array = [];
        var result = find(array, function(element, i, array){return element > 0});

        expect(result).toBe(undefined);
    });
    it('should return undefined if objects are compared in the condition', function () {
        var array = ['spray', [1, 2], 'elite', 'exuberant', 'destruction', 'present'];

        var result = find(array, function(word, i, array){return word === [1, 2]})

        expect(result).toBe(undefined);
    });
});
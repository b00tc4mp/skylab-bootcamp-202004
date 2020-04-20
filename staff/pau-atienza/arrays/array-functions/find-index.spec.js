'use strict';

describe('findIndex', function () {
    it('returns the index of the first element in the provided array that satisfies the provided testing function' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = findIndex(array, function(element){return element > 10});

        expect(result).toBe(1);
    });
    it('returns -1 if no elements in the provided array satisfy the provided testing function' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = findIndex(array, function(element){return element > 200});

        expect(result).toBe(-1);
    });
    it('returns -1 if the length of the array is 0' , function () {
        var array = [];
        var result = findIndex(array, function(element){return element > 0});

        expect(result).toBe(-1);
    });
    it('should return -1 if objects are compared in the condition', function () {
        var array = ['spray', [1, 2], 'elite', 'exuberant', 'destruction', 'present'];

        var result = findIndex(array, function(element){return element === [1,2]});

        expect(result).toBe(-1);
    });
});
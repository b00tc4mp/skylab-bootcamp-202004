'use strict';

describe('some', function () {
    it('returns true if an element in the provided array satisfies the provided testing function' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = some(array, function(element){ return element > 10});

        expect(result).toBe(true);
    });
    it('returns false if no elements in the provided array satisfy the provided testing function' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = some(array, function(element){ return element > 200});

        expect(result).toBe(false);
    });
    it('returns false if the length of the array is 0' , function () {
        var array = [];
        var result = some(array, function(element){ return element > 0});

        expect(result).toBe(false);
    });
    
    it('returns false when object comparisons are attempted' , function () {
        var array = [[1, 1]];
        var result = some(array, function(element){ return element === [1, 1]});

        expect(result).toBe(false);
    });
});
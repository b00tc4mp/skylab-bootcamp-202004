'use strict';

describe('reduce', function () {
    it('should return the sum of all the elements', function () {
        var array = [1, 2, 3];

        var result = reduce(array, function(accumulator, element) {return accumulator + element});

        expect(result).toBe(6);
    });
    it('should return the product of all the elements', function () {
        var array = [1, 2, 3];

        var result = reduce(array, function(accumulator, element) {return accumulator * element});

        expect(result).toBe(6);
    });
    it('if an initial value is provided, the operation will start at that index', function () {
        var array = [1, 2, 3];

        var result = reduce(array, function(accumulator, element) {return accumulator + element}, 1);

        expect(result).toBe(7);
    });
    it('if an empty array is introduced, it returns undefined (original function returns error)', function () {
        var array = [];
        var result = reduce(array, function(accumulator, element) {return accumulator + element});
        expect(result).toBe(undefined);
    });
});
'use strict';

describe('includes', function () {
    it('returns true if the element is found within the array called upon', function () {
        var array = [2, 9, 9];

        var result = includes(array, 9);

        expect(result).toBe(true);
    });

    it('if an index is provided, the count starts at the index', function () {
        var array = [2, 9, 9];

        var result = includes(array, 9, 2);

        expect(result).toBe(true);
    });

    it('if index is equal or higher than the length of the array, returns false', function () {
        var array = [2, 9, 9];

        var result = includes(array, 9, 3);

        expect(result).toBe(false);
    });
    it('if element is not found in the array, returns false', function () {
        var array = [2, 9, 9];

        var result = includes(array, 5);

        expect(result).toBe(false);
    });
    it('if index is negative, the search starts at the last position of the array minus the absolute value of index', function () {
        var array = [2, 9, 9];

        var result = includes(array, 9, -1);

        expect(result).toBe(true);
    });
    it('if index is negative and its absolute value is equal or higher than the length of the array, returns false', function () {
        var array = [2, 9, 9];

        var result = includes(array, 9, -3);

        expect(result).toBe(false);
    });

   
});
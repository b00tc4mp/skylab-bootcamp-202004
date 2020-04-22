describe('slice', function () {
    it('should return a new array with numbers from 2 to 4', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var newArray;

        newArray = slice(array, 1, 4);

        expect(newArray).toEqual([2, 3, 4]);
    });

    it('should return an empty array when the start is bigger than the array.length index', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var newArray;

        newArray = slice(array, 6);

        expect(newArray).toEqual([]);
    });

    it('should return a new array with numbers from 2 to 6 because the end of the slice is bigger than the array.length index', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var newArray;

        newArray = slice(array, 1, 9);

        expect(newArray).toEqual([2, 3, 4, 5, 6]);
    });
});
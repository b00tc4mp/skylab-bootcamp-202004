describe('indexOf', function () {
    it('should return -1 because we want to find the index of 9 which is not in the list', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var result;

        result = indexOf(array, 9); 

        expect(result).toBe(-1);
    });

    it('should return -1 because we want to find the index of the string "3" which is not in the list', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var result;

        result = indexOf(array, "3"); 

        expect(result).toBe(-1);
    });

    it('should return 2 because is the index of 3 in this array', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var result;

        result = indexOf(array, 3);

        expect(result).toBe(2);
    });

    it('should return -1 because 3 is in the array, but not starting the search in the 4th element of the array', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var result;

        result = indexOf(array, 3, 3); 

        expect(result).toBe(-1);
    });
});
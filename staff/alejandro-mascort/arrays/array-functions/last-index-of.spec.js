describe('lastIndexOf', function () {
    it('it should return 6 which is the position of the last 3 in the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = lastIndexOf(array, 3); 

        expect(result).toBe(6);
    });

    it('it should return 1 which is the position of the number 2 in the array starting the search in the 2ond element of the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = lastIndexOf(array, 2, 1); 

        expect(result).toBe(1);
    });

    it('it should return 5 which is the position of the number 6 in the array starting the search in the position = (length+negative index) of the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = lastIndexOf(array, 6, -3); 

        expect(result).toBe(5);
    });

    it('it should return -1 because there is no 4 in the array starting at the position 4', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = lastIndexOf(array, 4, 4); 

        expect(result).toBe(-1);
    });

    it('it should return -1 because we want to find the index of 9 which it does not exist in the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = lastIndexOf(array, 9); 

        expect(result).toBe(-1);
    });

    it('it should return 6 which is the position of 3 starting at the 4th element with a negative index', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = lastIndexOf(array, 3, -4); 

        expect(result).toBe(6);
    });
});
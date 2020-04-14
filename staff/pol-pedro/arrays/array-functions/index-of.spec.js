describe('indexOf', function () {
    it('it should return 2 which is the position of the number 3 in the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = indexOf(array, 3); 

        expect(result).toBe(2);
    });

    it('it should return 6 which is the position of the number 3 in the array starting the search in the 4th element of the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = indexOf(array, 3, 4); 

        expect(result).toBe(6);
    });

    it('it should return 5 which is the position of the number 6 in the array starting the search in the position = (length+negative index) of the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = indexOf(array, 6, -3); 

        expect(result).toBe(5);
    });

    it('it should return 2 which is the position of the number 3 in the array starting the search in the position 0 because the index given is to much negative', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = indexOf(array, 6, -25); 

        expect(result).toBe(5);
    });

    it('it should return -1 because we want to find the index of 9 which it does not exist in the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = indexOf(array, 9); 

        expect(result).toBe(-1);
    });

    it('it should return -1 because we want to find the index of 9 wich is not on the list, and respect the other test we are adding a index number ', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = indexOf(array, 9, 5); 

        expect(result).toBe(-1);
    });

});
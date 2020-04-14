describe('includes', function () {
    it('it should return true because 3 is on the array ', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = includes(array, 3); 

        expect(result).toBe(true);
    });

    it('it should return false because 9 isnt on the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = includes(array, 9); 

        expect(result).toBe(false);
    });

    it('it should return true because 6 is on the array and it possition is on the index scope', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = includes(array, 6, -3); 

        expect(result).toBe(true);
    });

    it('it should return false because 6 isnt on the index scoop even though it is on the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = includes(array, 6, -1); 

        expect(result).toBe(false);
    });

    it('it should return false because 9 isnt on the array', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = includes(array, 9); 

        expect(result).toBe(false);
    });

    it('it should return true because the index number is lower than the array lenght sow it will search all the array ', function () {
        var array = [1, 2, 3, 4, 5, 6, 3];
        var result;

        result = includes(array, 1, -15); 

        expect(result).toBe(true);
    });

});
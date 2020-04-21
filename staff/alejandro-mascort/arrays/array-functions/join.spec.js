describe('join', function () {
    it('should return the string 1,2,3 because no separator is specified', function () {
        var array = [1, 2, 3];

        var result= join(array);

        expect(result).toBe("1,2,3");
    });

    it('should return the string "1 2 3" because no separator is specified', function () {
        var array = [1, 2, 3];

        var result= join(array, " ");

        expect(result).toBe("1 2 3");
    });

    it('should return the string "" because the array is empty', function () {
        var array = [];

        var result= join(array, " ");

        expect(result).toBe("");
    });
});
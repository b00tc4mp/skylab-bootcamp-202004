describe('slice', function () {
    it('should return [2,3,4] which are the last three items', function () {
        var array = [1, 2, 3, 4];
        

        var result = slice(array, 1);

        expect(result).toEqual([2, 3, 4]);
    });

    it('should return [2,3,4] which are the last three items, with negative starting index', function () {
        var array = [1, 2, 3, 4];
        

        var result = slice(array, -3);

        expect(result).toEqual([2, 3, 4]);
    });

    it('should return [2,3] which are the second and third items', function () {
        var array = [1, 2, 3, 4];
        

        var result = slice(array, 1, 3);

        expect(result).toEqual([2, 3]);
    });

    it('should return [1,2] which are the first and second items with negative finish index', function () {
        var array = [1, 2, 3, 4];
        

        var result = slice(array, 0, -1);

        expect(result).toEqual([1, 2]);
    });

    it('should return [2,3, 4] which are the second and third items with negatives indexes', function () {
        var array = [1, 2, 3, 4, 5, 6];
        

        var result = slice(array, -5, -1);

        expect(result).toEqual([2, 3, 4]);
    });
});
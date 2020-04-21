describe('find', function () {
    it('should iterate on each element and return 3 which is the position of the element we want to find, element 3', function () {
        var array = [1, 2, 3, 4, 5, 6];

        var result = find(array, function(element, index) {
            if (element === 3) {
                return index;
            }
        });

        expect(result).toBe(3);
    });

    it('should iterate on each element and return undefined because we want to find, element 24 which does not exist', function () {
        var array = [1, 2, 3, 4, 5, 6];

        var result = find(array, function(element, index) {
            if (element === 24) {
                return index;
            }
        });

        expect(result).toBe(undefined);
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        find(array, function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        find(array, function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });

});
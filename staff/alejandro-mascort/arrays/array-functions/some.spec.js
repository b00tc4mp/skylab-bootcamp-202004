describe('some', function () {
    it('should iterate on each element and return true because we want to obtain element 3', function () {
        var array = [1, 2, 3, 4, 5, 6];

        var result = some(array, function(element, index) {
            if (element === 3) {
                return true;
            }
        });

        expect(result).toBeTruthy();
    });

    it('should  return false because we are passing an empty array', function () {
        var array = [];

        var result = some(array, function(element, index) {
            if (element === 24) {
                return true;
            }
        });

        expect(result).toBeFalsy();
    });

    it('should iterate on each element and return false because we want to element 24 which does not exist', function () {
        var array = [1, 2, 3, 4, 5, 6];

        var result = some(array, function(element, index) {
            if (element === 24) {
                return true;
            }
        });

        expect(result).toBeFalsy();
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        some(array, function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        some(array, function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });

});
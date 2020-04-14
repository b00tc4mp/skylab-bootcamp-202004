describe('every', function () {
    it('should iterate on each element and return false because we want to obtain element all elements as 3', function () {
        var array = [1, 2, 3, 4, 5, 6];

        var result = every(array, function(element, index) {
            if (element !== 3) {
                return true;
            }
        });

        expect(result).toBeFalsy();
    });

    it('should  return true because we are passing an empty array', function () {
        var array = [];

        var result = every(array, function(element, index) {
            if (element !== 24) {
                return false;
            }
        });

        expect(result).toBeTruthy();
    });

    it('should iterate on each element and return true because all elements satisfy element equals 2', function () {
        var array = [2, 2, 2, 2, 2, 2];

        var result = every(array, function(element){ return element !== 2; });

        expect(result).toBeTruthy();
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        every(array, function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        every(array, function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toEqual(array);
        expect(result[1]).toEqual(array);
        expect(result[2]).toEqual(array);
    });

});
describe('reduce', function () {
    it('should iterate on each element and return 21 which is the sum of each value in the array', function () {
        var array = [1, 2, 3, 5, 10];

        var result = reduce(array, function(accum, current, index, arr) {
            accum = accum+current;
            return accum; 
        });

        expect(result).toBe(21);
    });

    it('should iterate on each element and return 31 which is the sum of each value in the array plus the initial accumulate value', function () {
        var array = [1, 2, 3, 5, 10];

        var result = reduce(array, function(accum, current, index, arr) {
            accum = accum+current;
            return accum; 
        }, 10);

        expect(result).toBe(31);
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = [1, 2, 3, 5, 10];
        var result = [];

        reduce(array, function(accum, current, index, arr) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
        expect(result[3]).toBe(3);
        expect(result[4]).toBe(4);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        reduce(array, function(accum, current, index, arr) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });

    it('should give 1 then 3 and then 6 which are the values of the accum in each iteration', function () {
        var array = [1, 2, 3];
        var result = [];

        reduce(array, function(accum, current, index, arr) {
            accum = accum + current;
            result[index] = accum;
            return accum;
        });

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(6);
    });

    it('should give 1 then 2 and then 3 which are the values of the current value in each iteration', function () {
        var array = [1, 2, 3];
        var result = [];

        reduce(array, function(accum, current, index, arr) {
            accum = accum + current;
            result[index] = current;
            return accum;
        });

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });
});
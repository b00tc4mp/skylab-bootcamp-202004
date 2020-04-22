describe('every', function () {
    it('should return true because all numbers in the array are below 10', function () {
        var array = [1, 2, 4, 5, 6];
        var result;

        result = every(array, function(x) {
            if (x < 10) {
                return true
            }
        });

        expect(result).toBe(true);
    });

    it('should return false because all numbers in the array are below 10', function () {
        var array = [1, 2, 4, 5, 6];
        var result;

        result = every(array, function(x) {
            if (x > 10) {
                return true
            }
        });

        expect(result).toBe(false);
    });

    it('should return true because all the elements of the array are strings', function () {
        var array = ["chaqueta", "bufanda", "camiseta", "shorts"];
        var result;

        result = every(array, function(x) {
            if (typeof x === "string") {
                return true
            };
        });

        expect(result).toBe(true);
    });
});
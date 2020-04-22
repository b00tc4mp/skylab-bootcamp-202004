describe('some', function () {
    it('should return true because there are numbers below 10 in the array', function () {
        var array = [1, 2, 11, 4, 20, 5, 6, 12];
        var result;

        result = some(array, function(x) {
            if (x < 10) {
                return true
            }
        });

        expect(result).toBe(true);
    });

    it('should return true because there is a string in the array', function () {
        var array = [1, 2, 11, 4, 20, "palabra", 5, 6, 12];
        var result;

        result = some(array, function(x) {
            if (typeof x === "string") {
                return true
            }
        });

        expect(result).toBe(true);
    });

    it('should return false because the array is empty', function () {
        var array = [];
        var result;

        result = some(array, function(x) {
        });

        expect(result).toBe(false);
    });
});
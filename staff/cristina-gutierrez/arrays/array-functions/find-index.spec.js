describe('findIndex', function () {
    it('should return the index of the first number of the array that is greater than 4', function () {
        var array = [3, 9, 5, 2, 10];
        var result;

        result = findIndex(array, function(num) {
            if (num > 4) {
                return true;
            }
        });

        expect(result).toBe(1);
    });

    it('should return the index of the "camiseta" word of the array', function () {
        var array = ["chaqueta", "bufanda", "camiseta", "shorts"];
        var result;

        result = findIndex(array, function(x) {
            if (x === "camiseta") {
                return true
            };
        });

        expect(result).toBe(2);
    });

    it('should return undefined because we are searching for the index of 1, and it is not in the array', function () {
        var array = [3, 9, 5, 2, 10];
        var result;

        result = findIndex(array, function(x) {
            if (x === 1) {
                return true
            };
        });

        expect(result).toBe(-1);
    });
});
describe('find', function () {
    it('should return the first number of the array that is greater than 4', function () {
        var array = [3, 9, 5, 2, 10];
        var result;

        result = find(array, function(num) {
            return num > 4;
        });

        expect(result).toBe(9);
    });

    it('should return the "camiseta" word of the array', function () {
        var array = ["chaqueta", "bufanda", "camiseta", "shorts"];
        var result;

        result = find(array, function(x) {
            if (x === "camiseta") {
                return true;
            };
        });

        expect(result).toBe("camiseta");
    });

    it('should return undefined because we are searching for 1, and it is not in the array', function () {
        var array = [3, 9, 5, 2, 10];
        var result;

        result = find(array, function(x) {
            if (x === 1) {
                return true;
            };
        });

        expect(result).toBe(undefined);
    });
});
describe('reduce', function () {
    it('should return 15', function () {
        var array = [1, 2, 3, 4, 5];
        var result;

        result = reduce(array, function(acc, x) {
            return acc + x;
        });

        expect(result).toBe(15);
    });

    it('should return 20', function () {
        var array = [1, 2, 3, 4, 5];
        var result;

        result = reduce(array, function(acc, x) {
            return acc + x;
        }, 5);

        expect(result).toBe(20);
    });
});
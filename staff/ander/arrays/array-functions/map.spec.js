describe('map', function () {
    it('should iterate on each element and keep each value multiplied by 10 in a new external array', function () {
        var array = [1, 2, 3];
        var result = [];

        map(array, function(element, index) {
            result[index] = element * 10;
        });

        expect(result[0]).toBe(10);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(30);
    });
});
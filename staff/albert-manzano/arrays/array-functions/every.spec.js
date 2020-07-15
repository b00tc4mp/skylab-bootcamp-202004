describe('every', function() {
    it(' ests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value', function() {
        var array = [1, 2, 3];

        var result = every(array, function(element) {
            return element > 2;
        });
        expect(result).toBe(false);
    });
    it(' ests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value', function() {
        var array = [1, 2, 3];

        var result = every(array, function(element) {
            return element > 0;
        });
        expect(result).toBe(true);
    });
});
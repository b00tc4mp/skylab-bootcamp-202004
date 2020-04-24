describe('every', function() {
    it(' adds one or more elements to the end of an array and returns the new length of the array.', function() {
        var array = [1, 2, 3];

        var result = every(array, function(element) {
            return element > 2;
        });
        expect(result).toBe(false);
    });
    it(' adds one or more elements to the end of an array and returns the new length of the array.', function() {
        var array = [1, 2, 3];

        var result = every(array, function(element) {
            return element > 0;
        });
        expect(result).toBe(true);
    });
});
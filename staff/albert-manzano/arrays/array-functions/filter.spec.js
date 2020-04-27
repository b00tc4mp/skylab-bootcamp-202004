describe('filter', function() {
    it('This method creates a new array with all elements that pass the test implemented by the provided function.', function() {
        var array = [1, 2, 3, 4, 5];


        var result = filter(array, function(element) {
            return element < 3;
        });

        expect(result[1]).toBe(2);
    });

    it('This method creates a new array with all elements that pass the test implemented by the provided function.', function() {
        var array = [1, 2, 3, 4, 5];


        var result = filter(array, function(element) {
            return element > 3;
        });

        expect(result[0]).toBe(4);
    });
});
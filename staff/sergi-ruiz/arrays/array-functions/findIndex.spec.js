describe('findIndex', function() {
    it('This method returns the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.', function() {
        var array = [1, 2, 3, 4, 5];

        var result = findIndex(array, function(element) {
            return element < 0;
        });

        expect(result).toBe(-1);
    });

    it('This method returns the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.', function() {
        var array = [1, 2, 3, 4, 5];


        var result = findIndex(array, function(element) {
            return element > 4;
        });


        expect(result).toBe(4);
    });
});
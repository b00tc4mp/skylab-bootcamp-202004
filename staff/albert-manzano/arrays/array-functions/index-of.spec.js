describe('indexOf', function() {
    it('returns the first index at which a given element can be found in the array, or -1 if it is not present.', function() {
        var array = [1, 2, 3];
        var element = 1;

        var index = indexOf(array, element);
        expect(index).toBe(0);

    });

    it('returns the first index at which a given element can be found in the array, or -1 if it is not present.', function() {
        var array = [1, 2, 3];
        var element = 4;

        var index = indexOf(array, element)
        expect(index).toBe(-1);

    });
});
describe('IndexOf', function() {
    it('returns the first index at which a given element can be found in the array, or -1 if it is not present.', function() {
        var array = [1, 2, 3];
        var element = 2;

        var i = indexOf(array, element);
        expect(1).toBe(1);

    });

    it('returns the first index at which a given element can be found in the array, or -1 if it is not present.', function() {
        var array = [1, 2, 3];
        var element = 4;

        var i = indexOf(array, element)
        expect(i).toBe(-1);

    });
});
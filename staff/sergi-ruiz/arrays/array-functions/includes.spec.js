describe('includes', function() {
    it('determines whether an array includes a certain value among its entries, returning true or false as appropriate.', function() {
        var array = [1, 2, 3];
        var element = 2

        expect(includes(array, element)).toBe(true);
    });

    it('determines whether an array includes a certain value among its entries, returning true or false as appropriate.', function() {
        var array = [1, 2, 3];
        var element = 4;

        expect(includes(array, element)).toBe(false);
    });
});
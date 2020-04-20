describe('includes', function () {
    it('should determine whether an array includes a certain value among its entries, returning true or false as appropriate', function () {
        var array = [1, 2, 3];
        var element=4;

        var included=includes(array, element);

        expect(included).toBe(false);
    });
    it('should have into consideration the starting point of the find', function () {
        var array = [1, 2, 3];
        var element=1;
        var startFrom=1;

        var included=includes(array, element,startFrom);

        expect(included).toBe(false);
    });
});
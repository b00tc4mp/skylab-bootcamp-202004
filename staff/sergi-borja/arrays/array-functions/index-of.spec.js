describe('index-of', function () {
    it('should add one or more elements to the end of an array and returns the new length of the array', function () {
        var array = [1, 2, 3, 4];
        var element = 3;
        var index  = 2;

        var result= indexOf(array, element, index);

        expect(result).toBe(0);

    });

    it('should iterate on each element and keep each value in upper-case in a new external array', function () {
        var array = ['hello', 'cruel', 'world'];
        var element = 'world';
        var index = 1;

        var result= indexOf(array, element, index);

        expect(result).toBe(1);
    });
});
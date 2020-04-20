describe('slice', function () {
    it('should return a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var begin=2;
        var sliced=slice(array, begin);

        expect(sliced[0]).toBe(3);
        expect(sliced[1]).toBe(4);
        expect(sliced[2]).toBe(5);
    });
    it('should work when adding an end', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var begin=2;
        var end=5;
        var sliced=slice(array, begin,end);

        expect(sliced.length).toBe(3);
    });
    it('should not change the initail array', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var begin=2;
        var end=5;
        var sliced=slice(array, begin,end);

        expect(array.length).toBe(6);
    });
});
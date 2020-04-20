describe('every', function () {
    it('should tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.', function () {
        var array = [1, 2, 3, 4];
        var everyed=every(array, function(currentValue){return 50>currentValue});

        expect(everyed).toBe(true);
    });
    it('should not change the array ', function () {
        var array = [1, 2, 3, 4];
        every(array, function(currentValue){return 50<currentValue});

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
    });
});
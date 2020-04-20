describe('pop', function () {
    it('should remove the last element from an array', function () {
        var array = [1, 2, 3, 4];

        pop(array);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(undefined);
    });
    it('should return the last element of the array', function () {
        var array = [1, 2, 3, 4];

        var last=pop(array);

        expect(last).toBe(4);
    });
    it('should change the length of an array', function () {
        var array = [1, 2, 3, 4];

        pop(array);

        expect(array.length).toBe(3);
    });
});
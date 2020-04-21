describe('pop', function () {
    it('should delete the last item of the array and return the value that has been deleted from the array', function () {
        var array = [1, 2, 3];
        var lastItem;

        lastItem = pop(array);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(undefined);
        expect(array.length).toBe(2);
        expect(lastItem).toBe(3);
    });
});
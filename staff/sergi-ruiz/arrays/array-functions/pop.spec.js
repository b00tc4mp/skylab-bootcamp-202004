describe('pop', function() {
    it(' removes the last element from an array and returns that element. This method changes the length of the array.', function() {
        var array = [1, 2, 3];

        pop(array);

        expect(array[2]).toBe(undefined);
    });
});
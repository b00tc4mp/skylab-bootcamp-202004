describe('splice', function () {
    it('should return a new array with number 2', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var newArray = [];

        newArray = splice(array, 1, 1);

        expect(newArray).toEqual([2]);
    });
});
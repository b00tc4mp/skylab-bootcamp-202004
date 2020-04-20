describe('filter', function () {
    it('it should return an array filtering from another array, with the conditions of the callback function', function () {
        var arrayNum = [1, 20, 28, 2]

        var b = filter(arrayNum, function (element, index) {
            return element > 10
        })
        expect(b).toEqual([20, 28]);
    });
});
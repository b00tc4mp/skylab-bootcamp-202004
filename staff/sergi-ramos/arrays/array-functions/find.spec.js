'use strict'
describe('find', function () {
    it('The find() method returns the value of the first element in the provided array that satisfies the provided testing function', function () {

        var numbers = [2, 4, 8, 12, 15, 18, 20];

        var result = find(numbers, function (elemento) {
            return elemento > 10
        })

        expect(result).toBe(12);

    });
    it('The find() method returns undefined is array is empty', function () {
        var numbersEmpty = [];

        var result = find(numbersEmpty, function (elemento) {
            return elemento > 10
        })

        expect(result).toBe(undefined);
    });

    it('The find() method check the index element is working', function () {

        var numbers1 = [1, 2, 3, 4, 5];
        var count = 0;
        var result = find(numbers1, function (elemento, index) {
            expect(index).toBe(count++)
            return elemento > 22
        });
    });
});

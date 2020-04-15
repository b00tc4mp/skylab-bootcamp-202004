'use strict'
describe('find-index', function () {
    it('The findIndex() method returns the value of index of the first element in the provided array that satisfies the provided testing function', function () {

        var numbers = [2, 4, 8, 12, 15, 18, 20];

        var result = findIndex(numbers, function (elemento) {
            return elemento > 10
        })

        expect(result).toBe(12);

    });
   

});
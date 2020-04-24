'use strict'
describe('find-index', function () {
    it('The findIndex() method returns the value of index of the first element in the provided array that satisfies the provided testing function', function () {

        var numbers = [2, 4, 8, 12, 15, 18, 20];

        var result = findIndex(numbers, function (elemento) {
            return elemento === 18
        })

        expect(result).toBe(5);

    });

    it('Should method returns the value of index of the first number greater than 10', function () {

        var numbers = [2, 4, 8, 12, 15, 18, 20];

        var result = findIndex(numbers, function (element) {
            return element > 10;
        })

        expect(result).toBe(3);

    });

    it('Should return the value of index of the first element smaller than 89', function () {

        var numbers = [2, 4, 8, 12, 15, 18, 20];

        var result = findIndex(numbers, function (element) {
            return element < 5 ;
        })

        expect(result).toBe(0);
    });
   

});


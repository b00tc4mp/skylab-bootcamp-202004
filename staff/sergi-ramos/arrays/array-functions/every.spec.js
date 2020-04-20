'use strict'
describe('every', function () {
    it('should return true or false depending on whether there is all the elements that passes the callback test (in this case true)', function () {

        var array = [1, 2, 3, 4, 5]
        var boolean = every(array, function (element, index, array) {

            return element < 10
        })

        expect(boolean).toBe(true)
    });

    it('should return true or false depending on whether there is all the elements that passes the callback test (in this case false)', function () {

        var array = [1, 2, 3, 4, 5]
        var boolean = every(array, function (element, index, array) {

            return element > 10

        })

        expect(boolean).toBe(false)
    });

    it('should return true or false depending on whether there is all the elements that passes the callback test (in this case false)', function () {

        var array = [1, 2, 3, 4, 5]
        var result = []
        var boolean = every(array, function (element, index, array) {
            result.push(array[index])
            return element > 10

        })

        expect(boolean).toBe(false)
        expect(result).toEqual(array)

    });
});



'use strict'
describe('every', function () {
    it('should return true or false depending on whether there is any element that passes the callback test (in this case false)', function () {

        var array = [1, 2, 3, 4, 5, 6, 7, 8];
        var boolean;

        boolean = every(array, function (element) {
            return element > 10
        })
        expect(boolean).toBe(false)
    });

    it('should return true or false depending on whether there is any element that passes the callback test (in this case true)', function () {

        var array = [1, 2, 3, 4, 5, 6, 7, 8];
        var boolean;

        boolean = some(array, function (element) {
            return element < 4 
        })
        expect(boolean).toBe(true)
    });

    it('should return false since we pass an empty array', function () {

        var array = [];
        var boolean;

        boolean = some(array, function (element, index, array) {
            return element > 5
        })
        expect(boolean).toBe(false)
    });   
});
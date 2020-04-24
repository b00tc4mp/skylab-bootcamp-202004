'use strict';

describe('Arroz.prototype.includes', function() {
    it('it should return true because the number 3 is in the array', function() {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.includes(3);

        expect(result).toBeTruthy();
    });

    it('it should return true because the number 3 is in the array starting the search in the 4th element of the array', function() {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.includes(3, 4);

        expect(result).toBe(true);
    });

    it('it should return true because the number 6 is in the array starting the search in the position = (length+negative index) of the array', function() {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.includes(6, -3);

        expect(result).toBeTruthy();
    });

    it('it should return true because the number 3 in the array starting the search in the position 0 because the index given is to much negative', function() {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.includes(6, -25);

        expect(result).toBeTruthy();
    });

    it('it should return false because we want to find the index of 9 which it does not exist in the array', function() {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.includes(9);

        expect(result).toBeFalsy();
    });

    it('it should return false because we want to find the index of 9 which is not in the list, and respect the other test we are adding a index number ', function() {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.includes(9, 5);

        expect(result).toBeFalsy();
    });

    it('it should return false because we want to find the index of the string "3" which is not in the list', function() {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.includes("3");

        expect(result).toBeFalsy();
    });
    it('it should return an error if second argument is not an integer', function() {

        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        try {
            result = array.includes(3, 3.3);
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe("fromIndex is not an integer");
    });
});
'use strict',

describe('Arroz.prototype.indexOf', function () {
    it('it should return 2 which is the position of the number 3 in the array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.indexOf(3); 

        expect(result).toBe(2);
    });

    it('it should return 6 which is the position of the number 3 in the array starting the search in the 4th element of the array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.indexOf(3, 4); 

        expect(result).toBe(6);
    });

    it('it should return 5 which is the position of the number 6 in the array starting the search in the position = (length+negative index) of the array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.indexOf(6, -3); 

        expect(result).toBe(5);
    });

    it('it should return 5 which is the position of the number 3 in the array starting the search in the position 0 because the index given is too much negative', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.indexOf(6, -25); 

        expect(result).toBe(5);
    });

    it('it should return -1 because we want to find the index of 9 which it does not exist in the array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.indexOf(9); 

        expect(result).toBe(-1);
    });

    it('it should return -1 because we want to find the index of 9 which is not in the list, and respect the other test we are adding a index number ', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.indexOf(9, 5); 

        expect(result).toBe(-1);
    });

    it('it should return -1 because we want to find the index of the string "3" which is not in the list', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.indexOf("3"); 

        expect(result).toBe(-1);
    });

    it('it should return -1 because no arguments are introduced in the function', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.indexOf(); 

        expect(result).toBe(-1);
    });

    it('it should return false because we want to find the index of 2 with a string starting index of 3', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.includes(2,"3"); 

        expect(result).toBeFalsy();
    });

    it('it should return true because 2 is in the array ignoring the second argument', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 3);
        var result;

        result = array.includes(2,[]); 

        expect(result).toBeTruthy();
    });
});
"use strict";

describe('ArrozConLeche.prototype.set', function () {
    it('should return an error when first and second non-numerical parameter is passed', function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3, 4), new Arroz('a', 'b', 'c'));
        var result;

        try {
            array.set(true, 7, new Arroz(5, 6, 7));
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('true is not a number');
    });

        

        it('should return an error when first and second non-numerical parameter is passed', function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3, 4), new Arroz('a', 'b', 'c'));
        var result;

        try {
            array.set(1, 'l', new Arroz(5, 6, 7));
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('l is not a number');

    });


    it("Should try to insert an 8 as an array, and return a error", function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3), new Arroz(4, 5, 6));
        var result;

        try {
            array.set(1, undefined, 8);
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe("8 is not an Arroz");
    });
    

    it("Should create a new array in position 3 with the character 10.", function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3), new Arroz(4, 5, 6), new Arroz(7,8,9));
        
        array.set(3,0,10);

       
        expect(array[3][0]).toBe(10);
    });

});

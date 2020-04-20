'use strict'

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

        array = new ArrozConLeche(new Arroz(1, 2, 3, 4), new Arroz('a', 'b', 'c'));
        var result;

        try {
            array.set(1, 'l', new Arroz(5, 6, 7));
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('l is not a number');

    });

    it("...", function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3), new Arroz(4, 5, 6));
        var result;

        try {
            array.set(1, undefined, 8);
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe("8 is not an Arroz");
    });

    it("Should add new elements on different position of arrays", function (){
        var array = new ArrozConLeche(new Arroz(1,2,3), new Arroz (true, false, false, false, true), new Arroz('hola', 'mundo'));

        array.set(1, 2, 'hola');

        expect(array[1][2]).toBe('hola');

        array = new ArrozConLeche(new Arroz(1,2,3), new Arroz (true, false, false, false, true), new Arroz('hola', 'mundo'));

        array.set(5, 1, 'hola');

        expect(array[5][1]).toBe('hola');
    });
        
});
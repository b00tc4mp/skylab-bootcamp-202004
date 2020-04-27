'use strict'

describe('ArrozConLeche.prototype.push', function () {
    it('should add elements in to an array, using atributes from arroz.push', function () {
        var array = new ArrozConLeche(new Arroz (1, 2, 3, 4, 5));
        var array2 = new Arroz(1,2)
       
        var result = array.push(array2);
        expect(array[1][0]).toBe(1);
        expect(array[1][1]).toBe(2);
        expect(result).toBe(2)

    });
    it('should throw and errow', function () {
        var array = new ArrozConLeche(new Arroz (1, 2, 3, 4, 5));

        expect(function () {
            array.push(true);
        }).toThrowError(Error, 'true is not an Arroz');
    });
});
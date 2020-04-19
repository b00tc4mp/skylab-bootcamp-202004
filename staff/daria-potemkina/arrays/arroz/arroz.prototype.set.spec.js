'use strict'

describe('Arroz.prototype.set', function () {
    it('should return an error when first and second non-numerical parameter is passed', function () {
        var array = new Arroz(1, 2, 3, 4);

        expect(function(){
            array.set(true, 8);
        }).toThrowError(TypeError, 'true is not a number');
    });


    it("Should add new elements on different position of arrays", function (){
        var array = new Arroz(1, 2, 3, 4);

        array.set(1, 'hola');

        expect(array[0]).toBe(1);
        expect(array[1]).toBe('hola');
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
    });
});
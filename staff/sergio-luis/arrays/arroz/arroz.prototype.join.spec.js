"use strict";

describe('Arroz.prototype.join', function() {
    it('The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.', function() {
        var array = new Arroz('hola', 'esto', 'es', 'una', 'prueba', 2);

        var result1 = array.join();
        var result2 = array.join('');
        var result3 = array.join('-');

        expect(result1).toBe('hola,esto,es,una,prueba,2');
        expect(result2).toBe('holaestoesunaprueba2');
        expect(result3).toBe('hola-esto-es-una-prueba-2');
    });
    it('The join() Method thow error if parametre is not a string ', function() {
        var array = new Arroz(1, 2, 3, 4);

        expect(function() {
            array.join(123);
        }).toThrowError(TypeError, '123 is not a string');
    });
});
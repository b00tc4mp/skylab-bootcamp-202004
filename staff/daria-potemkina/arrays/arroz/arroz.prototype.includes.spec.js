'use strict';

describe('Arroz.prototype.includes', function () {
    it('it should return true', function () {
        var array = new Arroz(1, 5, 8);
        var result = array.includes(1);

        expect(result).toBeTruthy();

        array = new Arroz('hola', 'saludo', 'sol');
        var result = array.includes('sol');

        expect(result).toBeTruthy();

        array = new Arroz (1, 2, 3, 1, 5, 6, 1, 8);
        var result = array.includes(1, 2);

        expect(result).toBeTruthy();

    });

    it('it should return false', function () {
        var array = new Arroz(1, 5, 8);
        var result = array.includes(2);

        expect(result).toBe(false);

        array = new Arroz(1, 2, 3, 1, 5, 6, 1, 8);
        var result = array.includes(2, 4);

        expect(result).not.toBeTruthy();
    });

});
'use strict'

describe('Arroz.prototype.includes', function () {
    it('shall return true if a element matches the test', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.includes(2)
        expect(result).toBe(true);
    });

    it('shall return true if a element matches the test', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.includes(6)
        expect(result).toBe(false);
    });

});
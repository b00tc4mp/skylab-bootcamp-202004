'use strict'

describe('arroz.prototype.includes', function () {
    it('includes return a bollean', function () {
        var array =  new Arroz(5,2,1);

        var result1 = array.includes(2);
        var result2 = array.includes(6);

        expect(result1).toBe(true);
        expect(result2).toBe(false);
    });
    it('includes test with string an with fromIndex return a bollean', function () {
        var array = new Arroz('Hola','que','Tal');

        var result1 = array.includes('que',3);
        var result2 = array.includes('Hola',-1);

        expect(result1).toBe(false);
        expect(result2).toBe(true);
    });

});
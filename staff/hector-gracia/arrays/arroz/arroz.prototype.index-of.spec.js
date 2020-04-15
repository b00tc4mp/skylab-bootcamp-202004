'use strict';

describe('Arroz.prototype.index-of', function () {
    it('should return that where is the first 7 in the arroz', function () {
        var arroz = new Arroz(0,77,2,3,4,5,6,7,7,7);
        var result;

        result=arroz.indexOf(7);
        expect(result).toBe(7);
    });
    it('should return -1 if there is not such element in the arroz', function () {
        var arroz = new Arroz(0,77,2,3,4,5,6,7,7,7);
        var result;

        result=arroz.indexOf(31);
        expect(result).toBe(-1);
    });
});
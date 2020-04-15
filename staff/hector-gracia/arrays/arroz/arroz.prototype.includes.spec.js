'use strict';

describe('Arroz.prototype.includes', function () {
    it('should return that there is 7 in this arroz', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;

        result=arroz.includes(7);
        expect(result).toBe(true);
    });
    it('should return that there are not 2 in this arroz after an especified index', function () {
        var arroz = new Arroz("a",1,2,3,"pepe",5,6,7,"2",9);
        var result;

        result=arroz.includes(2,4);
        expect(result).toBe(false);
    });
});
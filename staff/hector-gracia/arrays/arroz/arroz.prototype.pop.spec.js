'use strict';

describe('Arroz.prototype.pop', function () {
    it('should remove the last element of the arroz', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;

        result=arroz.pop();
        expect(arroz[0]).toBe(0);
        expect(arroz[1]).toBe(1);
        expect(arroz[2]).toBe(2);
        expect(arroz[3]).toBe(3);
        expect(arroz[4]).toBe(4);
        expect(arroz[5]).toBe(5);
        expect(arroz[6]).toBe(6);
        expect(arroz[7]).toBe(7);
        expect(arroz[8]).toBe(8);
        expect(arroz.length).toBe(9);
    });
    it('should return the last element of the arroz', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;

        result=arroz.pop();
        expect(result).toBe(9);
    });
    it('should work wit an empty arroz', function () {
        var arroz = new Arroz();
        var result;

        result=arroz.pop();
        expect(result).toBe(undefined);
    });
});
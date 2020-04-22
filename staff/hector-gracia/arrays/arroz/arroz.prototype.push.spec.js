'use strict';

describe('Arroz.prototype.push', function () {
    it('should insert a new element at the end of the arroz', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;

        result=arroz.push(10);
        expect(arroz[0]).toBe(0);
        expect(arroz[1]).toBe(1);
        expect(arroz[2]).toBe(2);
        expect(arroz[3]).toBe(3);
        expect(arroz[4]).toBe(4);
        expect(arroz[5]).toBe(5);
        expect(arroz[6]).toBe(6);
        expect(arroz[7]).toBe(7);
        expect(arroz[8]).toBe(8);
        expect(arroz[9]).toBe(9);
        expect(arroz[10]).toBe(10);
        expect(arroz.length).toBe(11);
    });
    it('should insert varius elements at different index', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7);
        var result;

        result=arroz.push(8,9,10);
        expect(arroz[0]).toBe(0);
        expect(arroz[1]).toBe(1);
        expect(arroz[2]).toBe(2);
        expect(arroz[3]).toBe(3);
        expect(arroz[4]).toBe(4);
        expect(arroz[5]).toBe(5);
        expect(arroz[6]).toBe(6);
        expect(arroz[7]).toBe(7);
        expect(arroz[8]).toBe(8);
        expect(arroz[9]).toBe(9);
        expect(arroz[10]).toBe(10);
        expect(arroz.length).toBe(11);
    });
    it('should return the new length of the arroz', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7);
        var result;

        result=arroz.push(8,9,10);
        expect(result).toBe(11);
        expect(arroz.length).toBe(11);
        expect(result).toBe(arroz.length);
    });
});
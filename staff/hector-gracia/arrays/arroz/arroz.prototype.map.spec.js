'use strict';

describe('Arroz.prototype.map', function () {
    it('should make a new arroz whose values are the double than the original', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;

        result=arroz.map(function(element){
            return element*2;
        });
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(4);
        expect(result[3]).toBe(6);
        expect(result[4]).toBe(8);
        expect(result[5]).toBe(10);
        expect(result[6]).toBe(12);
        expect(result[7]).toBe(14);
        expect(result[8]).toBe(16);
        expect(result[9]).toBe(18);
    });
    it('should not change the original arroz', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;

        result=arroz.map(function(element){
            return element*2;
        });
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
    });
    it('should give an error when called without giving a callback parameter', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;
        var _error;
        try{
            result=arroz.map();
        }catch(error){
            _error=error;
        }
        
        expect(_error.message).toBe("expresion is not a function");
    });
});
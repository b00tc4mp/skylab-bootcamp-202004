'use strict';

describe('Arroz.generic', function () {
    it('should return a new arroz with length equal to the value given', function () {
        var length=9;
        var arroz = Arroz.generic(length);

        expect(arroz[0]).toBe(1);
        expect(arroz[1]).toBe(2);
        expect(arroz[2]).toBe(3);
        expect(arroz[3]).toBe(4);
        expect(arroz[4]).toBe(5);
        expect(arroz[5]).toBe(6);
        expect(arroz[6]).toBe(7);
        expect(arroz[7]).toBe(8);
        expect(arroz[8]).toBe(9);
        expect(arroz[9]).toBe(undefined);
        expect(arroz.length).toBe(9);
    });
    it('should return an empty arroz when given 0 length', function () {
        var length=0;
        var arroz = Arroz.generic(length);

        expect(arroz[0]).toBe(undefined);
        expect(arroz.length).toBe(0);
    });
    it('should give an error when given a decimal number as the length', function () {
        var _error;
        try{
            var arroz = Arroz.generic(2.2);
        }catch(error){
            _error=error;
        }
        
        expect(_error.message).toBe("length is not an integer");
    });
    it('should not have from as an enumerable property', function () {
        var arroz = new Arroz(1, 2, 3);

        expect(Object.keys(arroz).includes("from")).toBe(false);
    });
});
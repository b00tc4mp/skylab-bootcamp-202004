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
    it('should find for an undefined element in the arroz when given no parameters', function () {
        var arroz = new Arroz(0,1,2,3, undefined,5,6,7,8,9);
        var result;
        
        result=arroz.indexOf();
        
        expect(result).toBe(4);
    });
    it('should give an error when given a decimal number as the estarting point', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;
        var _error;
        try{
            result=arroz.indexOf(3,1.1);
        }catch(error){
            _error=error;
        }
        
        expect(_error.message).toBe("fromIndex is not an integer");
    });
});
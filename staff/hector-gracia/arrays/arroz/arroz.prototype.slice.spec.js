'use strict';

describe('Arroz.prototype.slice', function () {
    it('should make a copy of the specified part of the arroz', function () {
        var arroz = new Arroz(0,1,2,3,4);
        var result;

        result=arroz.slice(2,4)
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
    });
    it('should work when using a negative start', function () {
        var arroz = new Arroz(0,1,2,3,4);
        var result;

        result=arroz.slice(-3,4)
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
    });
    it('should work when using a negative end', function () {
        var arroz = new Arroz(0,1,2,3,4);
        var result;

        result=arroz.slice(1,-1)
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);

    });
    it('should give an error when given a decimal number as the starting or ending point', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;
        var _error;
        try{
            result=arroz.slice(3,1.1);
        }catch(error){
            _error=error;
        }
        
        expect(_error.message).toBe("end is not an integer");
        try{
            result=arroz.slice(1.1,3);
        }catch(error){
            _error=error;
        }
        
        expect(_error.message).toBe("start is not an integer");
    });
    
});
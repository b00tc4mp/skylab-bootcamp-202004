'use strict';

describe('Arroz.prototype.some', function () {
    it('should check if the arroz have any element where the expresion is true', function () {
        var arroz = new Arroz(10,10,2,30,40);
        var result;

        result=arroz.some(function(element,index){
            return element===index;
        })
        expect(result).toBe(true);
    });
    it('should return false if used in an empty arroz', function () {
        var arroz = new Arroz();
        var result;

        result=arroz.some(function(element,index){
            return true;
        })
        expect(result).toBe(false);
    });
    it('should give an error when called without giving a callback parameter', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result=false;
        var _error;
        try{
            result=arroz.some();
        }catch(error){
            _error=error;
        }
        
        expect(_error.message).toBe("expresion is not a function");
    });
});
'use strict';

describe('Arroz.prototype.filter', function () {
    it('should generate a new arroz with all the elements higher than 4', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;

        result=arroz.filter(function(element){
            return element>4;
            });
        expect(result[0]).toBe(5);
    });
    
    it('should generate an empty arroz as no element makes the callback true', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;

        result=arroz.filter(function(element){
            return element>40;
            });
        expect(result.length).toBe(0);
    });it('should give an error when called without giving a callback parameter', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;
        var _error;
        try{
            result=arroz.filter();
        }catch(error){
            _error=error;
        }
        
        expect(_error.message).toBe("expresion is not a function");
    });
});
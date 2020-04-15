'use strict';

describe('Arroz.prototype.reduce', function () {
    it('should add the elements of the arroz into a new variable', function () {
        var arroz = new Arroz(0,1,2,3,4);
        var result;

        result=arroz.reduce(function(acumulator,value){
            return acumulator+value;
        });
        expect(result).toBe(10);
    });
    it('should add a specified value to the result', function () {
        var arroz = new Arroz(0,1,2,3,4);
        var result; 

        result=arroz.reduce(function(acumulator,value){
            return acumulator+value;
        },10);
        expect(result).toBe(20);
    });
    
});
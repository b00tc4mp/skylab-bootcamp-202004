'use strict';

describe('Arroz.prototype.forEach', function () {
    it('should iterate in each element and keep track of how many times one of its bigger than 3', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var times=0;

        arroz.forEach(function(element,index){
            if(element>3)
                times++;
            });
        
        expect(times).toBe(6);
    });
    it('should create an arroz with all arrozs elements whose index is bigger than 5', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result=new Arroz();
        result.length=0;

        arroz.forEach(function(element,index){
            if(index>5)
                {result[result.length]=index;
                result.length++;}
            });
        expect(result[0]).toBe(6);
    });
    it('should give an error when called without giving a callback parameter', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result;
        var _error;
        try{
            result=arroz.forEach();
        }catch(error){
            _error=error;
        }
        
        expect(_error.message).toBe("expresion is not a function");
    });
});
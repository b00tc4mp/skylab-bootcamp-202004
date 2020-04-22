'use strict';

describe('Arroz.prototype.isShorted', function () {
    it('should recognise if an arroz is shorted from minor to mayor', function () {
        var arroz = new Arroz(0,1,2,3);
        var result;
        result =arroz.isSorted();
        expect(result).toBe(true)
    });
    it('should give an error if the arroz contains anything more than numbers', function () {
        var arroz = new Arroz("a","b","c");
        var _error;

        try{
            arroz.isSorted();
        }catch(error){
            _error=error;
        }
        expect(_error.message).toBe("not all elements in the arroz are numbers");
    });
});

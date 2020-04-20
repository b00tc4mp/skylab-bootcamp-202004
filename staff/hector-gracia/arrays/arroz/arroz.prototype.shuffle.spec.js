'use strict';

describe('Arroz.prototype.shuffle', function () {
    it('should reorganize the elements of the arroz randomly', function () {
        var arroz = new Arroz(0,1,2,3,4);
        var copy= new Arroz(0,1,2,3,4);

        arroz.shuffle();

        for(var i=0; i<arroz.length;i++){
            expect(arroz.includes(copy[i])).toBe(true);
        }
    });
    it('should not change the length of the arroz', function () {
        var arroz = new Arroz(0,1,2,3,4);

        arroz.shuffle();
        expect(arroz.length).toBe(5);
    });
    it('should give an error if used in an empty arroz', function () {
        var arroz = new Arroz();
        var _error;

        try{
            arroz.shuffle();
        }catch(error){
            _error=error;
        }
        expect(_error.message).toBe("arroz has no length");
    });
    
});
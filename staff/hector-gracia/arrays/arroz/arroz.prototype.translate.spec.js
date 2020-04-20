'use strict';

describe('Arroz.prototype.translate', function () {
    it('should change the index of the values of the arroz', function () {
        var arroz = new Arroz(1,2,3,4,5);

        arroz.translate();

        expect(arroz.length).toBe(5);
        expect(arroz[1]).toBe(3);
        expect(arroz[2]).toBe(4);
        expect(arroz[3]).toBe(5);
        expect(arroz[4]).toBe(1);
        expect(arroz[0]).toBe(2);
    });
    it('should change the index the other way when using a negative parameter', function () {
        var arroz = new Arroz(1,2,3,4,5);

        arroz.translate(-1);

        expect(arroz.length).toBe(5);
        expect(arroz[1]).toBe(1);
        expect(arroz[2]).toBe(2);
        expect(arroz[3]).toBe(3);
        expect(arroz[4]).toBe(4);
        expect(arroz[0]).toBe(5);
    });
    it('should not change the values inside de arroz', function () {
        var arroz = new Arroz(1,2,3,4,5);
        var copy = new Arroz(1,2,3,4,5);
        arroz.translate(3);
        expect(arroz.length).toBe(5);
        for(var i=0;i<copy.length;i++){
            expect(copy.includes(arroz[i]))
        }
    });
    it('should give an error when trying to use call the method with decimal numb', function () {
        var arroz = new Arroz(1,2,3,4,5);
        var value=2.2;
        var _error;
        var bool=true;

        try{
            arroz.translate(value);

        }catch(error){
            _error=error;
        }
        expect(_error.message).toBe(value + "is not an integer");
        try{
            arroz.translate(bool);

        }catch(error){
            _error=error;
        }
        expect(_error.message).toBe(bool + "is not an integer");
    });
    
});
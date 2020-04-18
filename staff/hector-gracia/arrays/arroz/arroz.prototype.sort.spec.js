'use strict';

describe('Arroz.prototype.sort', function () {
    it('should sort from minor to mayor a numeric arroz', function () {
        var arroz = new Arroz(1,-5,-31,-4);

        arroz.sort();
        expect(arroz[0]).toBe(-31);
        expect(arroz[1]).toBe(-5);
        expect(arroz[2]).toBe(-4);
        expect(arroz[3]).toBe(1);
    });
    it('should be able to short a shuffled arroz', function () {
        var arroz = Arroz.generic(10);
        var copy= Arroz.generic(10);

        arroz.shuffle();
        arroz.sort();
        for(var i=0;i<arroz.length;i++){
            expect(arroz[i]).toBe(copy[i]);
        }
    });
    it('should give an error if the arroz does not contain only numbers', function () {
        var arroz = new Arroz("Hello"," World");
        var result;

        result=arroz.join(" cruel");
        expect(result).toBe("Hello cruel World");
    });
});
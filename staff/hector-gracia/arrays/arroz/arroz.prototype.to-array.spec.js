'use strict';

describe('Arroz.prototype.toArray', function () {
    it('should generate an array whose values are equal to the arroz', function () {
        var arroz=new Arroz(1,2,3,4,5,6,7,8,9);
        var array;

        array=arroz.toArray();
        for(var i=0;i<array.length;i++){
            expect(array[i]).toBe(arroz[i]);
        }
        expect(array.length).toBe(arroz.length);
        expect(array.__proto__).toBe([].__proto__);
    });
    it('should generate an array whose length is equal to the arroz', function () {
        var arroz=new Arroz(1,2,3,4,5,6,7,8,9);
        var array;

        array=arroz.toArray();
        expect(array.length).toBe(arroz.length);
        expect(array.__proto__).toBe([].__proto__);
    });
    it('should convert itself into an array', function () {
        var arroz=new Arroz(1,2,3,4,5,6,7,8,9);
        var array;

        arroz=arroz.toArray();
        for(var i=0;i<arroz.length;i++){
            expect(arroz[i]).toBe(i+1);
        }
        expect(arroz.__proto__).toBe([].__proto__);
    });
});
'use strict';

describe('Arroz', function () {
    it('should instanciate an Arroz with length 0 on no arguments', function () {
        var array = new Arroz();

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(0);
    });

    it('should instanciate an Arroz with length 3 on 1,2,3 arguments', function () {
        var array = new Arroz(1, 2, 3);

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(3);
    });
    it('should instanciate an Arroz with length 1 when using an arraylike in the constructor', function () {
        var array = new Arroz([1, 2, 3]);

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(1);
    });
    it('should instanciate an Arroz with length 1 an a decimal number as parameter', function () {
        var array = new Arroz(1.5);

        expect(array.length).toBe(1);
        expect(array[0]).toBe(1.5)
    });
    it('should not have length as an enumerable property', function () {
        var arroz = new Arroz(1, 2, 3);

        expect(Object.keys(arroz).includes("length")).toBe(false);
    });
});
'use strict';

describe('Arroz.constructor', function () {
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

    it('if only a number is introduced, it should generate an Arroz with length = number and number empty slots', function () {
        var array = new Arroz(5);

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(5);
        expect(array[0]).toBe(undefined);
        expect(array[1]).toBe(undefined);
        expect(array[2]).toBe(undefined);
        expect(array[3]).toBe(undefined);
        expect(array[4]).toBe(undefined);

    });

    it('length should not be enumerable', function () {
        var array = new Arroz(1, 2, 3);
        for (var i in array)
            array[i] = array[i] + 4

        expect(array.length).toBe(3);
       
        expect(array[0]).toBe(5);
        expect(array[1]).toBe(6);
        expect(array[2]).toBe(7);
    });



});